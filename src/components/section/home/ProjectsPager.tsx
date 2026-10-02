"use client";

import { useRef, useState, type ReactNode } from "react";

import { scrollToElement } from "@/lib/scroll";

/**
 * The interactive half of ProjectsSection: which page of cards is showing.
 *
 * The cards arrive already rendered, one entry of `pages` per page. They are
 * built by ProjectsSection on the server, so neither ProjectCard nor the
 * project content behind it is part of this component's module graph — the
 * browser gets their output, not their code or their data. Only the page
 * number and the buttons that change it run here.
 */
export default function ProjectsPager({ pages }: { pages: ReactNode[] }) {
    const listRef = useRef<HTMLUListElement>(null);
    const [page, setPage] = useState(1);

    const pageCount = pages.length;
    const currentPage = Math.min(page, pageCount);

    const goToPage = (next: number) => {
        setPage(next);
        // Previously `router.push('#projects')`, which pushed a history entry
        // to perform what is really just a scroll.
        scrollToElement(listRef.current?.closest("section"));
    };

    return (
        <>
            <ul
                ref={listRef}
                className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
                {pages[currentPage - 1]}
            </ul>

            {pageCount > 1 && (
                <nav className="mt-12 flex justify-center" aria-label="Projects pagination">
                    <ul className="flex gap-2">
                        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                            (pageNumber) => {
                                const isCurrent = pageNumber === currentPage;
                                return (
                                    <li key={pageNumber}>
                                        <button
                                            type="button"
                                            onClick={() => goToPage(pageNumber)}
                                            aria-current={isCurrent ? "page" : undefined}
                                            aria-label={`Go to projects page ${pageNumber}`}
                                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                                                isCurrent
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </nav>
            )}
        </>
    );
}
