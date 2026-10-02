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

/** Storage throws in private mode and wherever site data is blocked. */
function readVisited(): string[] {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        const parsed: unknown = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
    } catch {
        return [];
    }
}

function writeVisited(slugs: string[]) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
        /* Storage is a nicety here; the link still works without it. */
    }
}

/**
 * One suggestion, always picked at random from the projects this visitor has
 * not read yet. When the last of them is reached a new lap begins, minus the
 * page just left, so the order never settles and nothing is offered twice
 * while something else is still waiting.
 *
 * Listing every remaining project here made the section pointless: three links
 * sitting beside "All projects" is just a worse version of that page. A single
 * card is a suggestion, which is the only reason to put anything here at all.
 *
 * The first render — server and hydration alike — is always `candidates[0]`,
 * the next project in rotation. That keeps the markup deterministic, so React
 * has nothing to reconcile and a crawler meets the same chain on every visit:
 * each project points at the following one, and the cycle covers the whole set.
 * The shuffle is a client-side nicety layered on afterwards.
 *
 * Four projects cannot give both a random order and the widest possible gap
 * between repeats. Holding a repeat a full lap away forces the pick every
 * time — the other two candidates were seen more recently by construction — so
 * the order would stop varying at all. Keeping the choice costs one step of
 * that gap, and a repeat three apart is far less noticeable than every visitor
 * being walked through the same fixed cycle.
 *
 * Kept in sessionStorage, so the tour lasts exactly as long as the tab: it
 * survives moving between projects and reloading, and goes when the tab does,
 * and therefore when the browser does. The queue is capped at the number of
 * projects, so it cannot grow, and nothing has to expire.
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

        /*
         * History is a recency queue, most recent last, rather than a set that
         * is emptied once everything has been read. Emptying it was the bug:
         * it made every project eligible at once, so landing on the fourth
         * could offer the one seen two steps earlier — a repeat after a gap of
         * three, which is what reading all four is supposed to rule out.
         */
        const stored = readVisited();

        // The page read just before this one, taken before the current slug is
        // added and skipping it, so a reload is not mistaken for the step back.
        const previous = [...stored].reverse().find((slug) => slug !== currentSlug);

        const lap = stored.includes(currentSlug) ? stored : [...stored, currentSlug];

        /*
         * The record is the current lap, not a rolling window. That distinction
         * is the whole mechanism: while a lap is in progress the pick is random
         * among the projects it has not covered, so every project comes up once
         * before any comes up twice. A rolling window loses that — once it is
         * full, nothing is ever "unread" again, and a project can be offered
         * twice while another waits several steps.
         */
        let pool = candidates.filter((c) => !lap.includes(c.slug));

        if (pool.length === 0) {
            /*
             * Lap complete, so the next one begins, seeded with the page being
             * read. `previous` is held out of its first pick: a new lap makes
             * everything eligible again, and offering the page from one click
             * ago reads as doubling back however the bookkeeping sees it.
             */
            writeVisited([currentSlug]);
            const fresh = candidates.filter((c) => c.slug !== previous);
            pool = fresh.length > 0 ? fresh : candidates;
        } else {
            writeVisited(lap);
        }

        const pick = pool[Math.floor(Math.random() * pool.length)];

        /*
         * Swapped on the next frame rather than during the effect. The server
         * markup gets to paint first, so hydration has nothing to reconcile,
         * and this card sits at the very foot of the page — the swap has long
         * since happened by the time anyone scrolls to it. It also keeps the
         * state update out of the effect body, which cascading-render linting
         * rightly objects to.
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
