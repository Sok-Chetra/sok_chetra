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
 * One suggestion, always picked at random: from the projects this visitor has
 * not opened, or, once they have all been read, from all but the most recently
 * seen.
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
 * Holding back the most recent is what stops the loop doubling back. Clearing
 * the record once everything had been read made all of them eligible at once,
 * so the fourth page could offer the one seen two steps before. Ranking by
 * recency and dropping the newest keeps every repeat at least three steps
 * apart while leaving two projects to choose between, so the order never
 * settles into one fixed cycle.
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
        const history = readVisited().filter((slug) => slug !== currentSlug);
        history.push(currentSlug);

        // Bounded by the number of projects, so it cannot grow without limit.
        writeVisited(history.slice(-(candidates.length + 1)));

        const unseen = candidates.filter((c) => !history.includes(c.slug));

        /*
         * Still something unread: pick from those, at random, so no two
         * visitors are walked through the work in the same order.
         *
         * Everything read: rank by how long ago and drop only the most recent,
         * then pick at random from the rest. Dropping it is what stops the loop
         * doubling straight back to the page before last; leaving the others in
         * is what keeps the order from hardening into one fixed cycle.
         *
         * Four projects cannot give both the widest possible gap and a free
         * choice. Holding the gap at a full lap leaves exactly one candidate —
         * the other two were seen more recently by construction — so the order
         * stops varying at all. Giving up one step of that gap leaves two to
         * choose between, every time, which is the better trade: a repeat three
         * steps apart is hard to notice, whereas the same fixed loop is not.
         */
        const pool =
            unseen.length > 0
                ? unseen
                : [...candidates]
                      .sort((a, b) => history.indexOf(a.slug) - history.indexOf(b.slug))
                      .slice(0, -1);

        const pick = (pool.length > 0 ? pool : candidates)[
            Math.floor(Math.random() * (pool.length > 0 ? pool.length : candidates.length))
        ];

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
