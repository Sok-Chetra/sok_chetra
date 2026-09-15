"use client";

import { motion } from "framer-motion";

import { scrollToId } from "@/lib/scroll";

/**
 * The bouncing "scroll down" cue.
 *
 * Rendered as a real anchor so it still works with JavaScript disabled and is
 * announced as a link, but the click is intercepted and handled by script. That
 * keeps the URL clean and — crucially — lets it work every time, which a plain
 * hash link does not once the hash is already set.
 */
export default function ScrollCue({ targetId }: { targetId: string }) {
    return (
        <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
            <a
                href={`#${targetId}`}
                onClick={(event) => {
                    event.preventDefault();
                    scrollToId(targetId);
                }}
                aria-label="Scroll down to the projects section"
                className="block rounded-full p-2 text-gray-600 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
                <svg
                    aria-hidden
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                </svg>
            </a>
        </motion.div>
    );
}
