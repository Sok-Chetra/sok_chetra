"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export type NextProjectCandidate = {
    slug: string;
    title: string;
    image: StaticImageData;
};

const STORAGE_KEY = "sokchetra:visited-projects";

/**
 * Everything the tour needs to remember between page views.
 *
 * `lap` is the status: the projects read since the tour last started over.
 * `page` and `pick` record the last page view handled and the suggestion it
 * got, which is what lets that view be recognised if it is processed again.
 */
type TourState = { lap: string[]; page: string | null; pick: string | null };

const EMPTY: TourState = { lap: [], page: null, pick: null };

const isSlugList = (v: unknown): v is string[] =>
    Array.isArray(v) && v.every((s) => typeof s === "string");

/** Storage throws in private mode and wherever site data is blocked. */
function readState(): TourState {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw) return EMPTY;
        const parsed: unknown = JSON.parse(raw);

        // Earlier builds stored the bare list; keep its progress rather than
        // restarting the tour of anyone mid-way through one.
        if (isSlugList(parsed)) return { lap: parsed, page: null, pick: null };

        if (typeof parsed === "object" && parsed !== null) {
            const { lap, page, pick } = parsed as Record<string, unknown>;
            return {
                lap: isSlugList(lap) ? lap : [],
                page: typeof page === "string" ? page : null,
                pick: typeof pick === "string" ? pick : null,
            };
        }
        return EMPTY;
    } catch {
        return EMPTY;
    }
}

function writeState(state: TourState) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        /* Storage is a nicety here; the link still works without it. */
    }
}

/**
 * Advances the tour by one page view. Pure: same state in, same result out,
 * with the only chance confined to `random`.
 *
 * Each project has a status, read or unread. Landing on a page marks it read,
 * and the suggestion is a random project still unread. Once every project is
 * read, all of them go back to unread — the page being read included — and the
 * next round starts from a clean slate.
 *
 * Resetting the current page too is what makes a round four page views long.
 * Seeding the new round with it instead meant the last page of one round also
 * counted toward the next, so the second round needed only three new pages,
 * finished a view early, and let a project back in before the fourth had come
 * round: A B C P, then B A C B.
 *
 * At every step the page read just before this one is held back as well.
 * Within a round it is already read, so this changes nothing; across a reset
 * it stops the first picks of the new round doubling back to the end of the
 * old one, which keeps any repeat at least three page views apart.
 */
function advance(
    state: TourState,
    currentSlug: string,
    candidates: NextProjectCandidate[],
    random: () => number
): { next: TourState; pick: NextProjectCandidate } {
    const previous = state.page !== currentSlug ? state.page : null;
    const lap = state.lap.includes(currentSlug) ? state.lap : [...state.lap, currentSlug];

    let nextLap = lap;
    let unread = candidates.filter((c) => !lap.includes(c.slug));

    if (unread.length === 0) {
        nextLap = [];
        unread = candidates;
    }

    const notBack = unread.filter((c) => c.slug !== previous);
    const pool = notBack.length > 0 ? notBack : unread;

    const pick = pool[Math.floor(random() * pool.length)];
    return { next: { lap: nextLap, page: currentSlug, pick: pick.slug }, pick };
}

/**
 * One suggestion at the foot of a project page: a random project this visitor
 * has not read yet, starting over once they have read them all.
 *
 * Listing every remaining project here made the section pointless — three
 * links beside "All projects" is a worse version of that page. A single card is
 * a suggestion, which is the only reason to put anything here at all.
 *
 * The first render, on the server and at hydration, is `candidates[0]`, the
 * next project in rotation. That keeps the markup deterministic, so React has
 * nothing to reconcile and a crawler meets the same chain on every fetch. The
 * random pick replaces it on the client one frame later.
 *
 * Kept in sessionStorage, so the tour lasts as long as the tab: it survives
 * moving between projects and reloading, and goes when the tab does.
 */
export default function NextProjectLink({
    currentSlug,
    candidates,
}: {
    currentSlug: string;
    candidates: NextProjectCandidate[];
}) {
    const [choice, setChoice] = useState(candidates[0]);

    useEffect(() => {
        if (candidates.length === 0) return;

        const state = readState();

        /*
         * A page view already handled — the effect running again for the same
         * page — gets back the suggestion it was given rather than a new one.
         *
         * This is what makes the effect safe to run twice. It reads storage and
         * then writes it, so without this a second run sees its own write: the
         * lap has already reset, the page just left is forgotten, and the
         * reset's one safeguard against doubling back is gone. React runs every
         * effect twice in development precisely to expose that, which is why it
         * showed on `next dev` and never in a production build.
         *
         * The same check holds the suggestion steady when someone leaves a
         * project for the grid or the home page and comes straight back to it,
         * because neither of those pages advances the tour.
         */
        const handled =
            state.page === currentSlug &&
            candidates.find((c) => c.slug === state.pick);

        let pick: NextProjectCandidate;
        if (handled) {
            pick = handled;
        } else {
            const step = advance(state, currentSlug, candidates, Math.random);
            writeState(step.next);
            pick = step.pick;
        }

        /*
         * Swapped on the next frame rather than during the effect. The server
         * markup gets to paint first, so hydration has nothing to reconcile,
         * and this card sits at the foot of the page — the swap has long since
         * happened by the time anyone scrolls to it. It also keeps the state
         * update out of the effect body, which cascading-render linting rightly
         * objects to.
         */
        const frame = requestAnimationFrame(() => setChoice(pick));
        return () => cancelAnimationFrame(frame);
    }, [currentSlug, candidates]);

    if (!choice) return null;

    return (
        <Link
            href={`/portfolio/${choice.slug}`}
            className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-colors hover:border-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-400"
        >
            {/*
              A fixed 128x80 thumbnail, and the title truncated to one line, so
              the card is the same size whichever project is chosen. Swapping
              after hydration therefore moves nothing, which is what keeps CLS
              at zero.
            */}
            <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg">
                <Image
                    src={choice.image}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-cover object-top"
                />
            </div>

            <div className="min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400">Next project</p>
                <p className="truncate text-lg font-semibold text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                    {choice.title}
                </p>
            </div>

            <FaArrowRight
                aria-hidden
                className="ml-auto shrink-0 text-indigo-600 transition-transform group-hover:translate-x-1 dark:text-indigo-400"
            />
        </Link>
    );
}
