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
 * One suggestion, chosen at random from the projects this visitor has not
 * opened yet — and once they have seen them all, the set clears and starts
 * over, so the suggestion never runs dry.
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
 * Visits are kept in sessionStorage, so the tour lasts exactly as long as the
 * tab: it survives navigating between projects and reloading, and is discarded
 * when the tab closes — and therefore when the browser does. No expiry is
 * needed on top, because the set already empties itself the moment every
 * project has been read, so it can never sit full and stale.
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

        const visited = readVisited();

        // The page read immediately before this one. Taken before the current
        // slug is appended, and skipping the current slug so a reload or a
        // return to the same page does not count as the step before itself.
        const previous = [...visited].reverse().find((slug) => slug !== currentSlug);

        if (!visited.includes(currentSlug)) visited.push(currentSlug);

        let pool = candidates.filter((c) => !visited.includes(c.slug));

        if (pool.length === 0) {
            /*
             * Every project has been read, so the tour starts over: only the
             * page being read is kept, which both stops the next pick being the
             * one already on screen and restarts the count from here.
             *
             * `previous` is held out of the first pick of the new round as well.
             * Dropping the record makes everything eligible again, and the page
             * one click back is the most recent thing the visitor saw — offering
             * it the instant the tour resets reads as a duplicate, whatever the
             * bookkeeping says. The fallback covers a set too small to spare it.
             */
            writeVisited([currentSlug]);
            const fresh = candidates.filter((c) => c.slug !== previous);
            pool = fresh.length > 0 ? fresh : candidates;
        } else {
            writeVisited(visited);
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
