"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

import ProjectCard from "./ProjectCard";
import { fadeInUp, VIEWPORT_ONCE } from "@/lib/animations";
import { PROJECTS } from "@/lib/content/projects";
import { useGridColumns } from "@/lib/hooks/useGridColumns";
import { scrollToElement } from "@/lib/scroll";

type ProjectsSectionProps = {
    title?: string;
    /** Rows of cards per page; page size is rows × current column count. */
    rows?: number;
};

export default function ProjectsSection({ title = "My Projects", rows = 1 }: ProjectsSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const columns = useGridColumns();
    const [page, setPage] = useState(1);

    const pageSize = columns * rows;
    const pageCount = Math.ceil(PROJECTS.length / pageSize);

    // A resize can shrink the page count out from under the current page, so
    // clamp during render rather than correcting it afterwards in an effect.
    const currentPage = Math.min(page, pageCount);
    const visibleProjects = PROJECTS.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const goToPage = (next: number) => {
        setPage(next);
        // Previously `router.push('#projects')`, which pushed a history entry
        // to perform what is really just a scroll.
        scrollToElement(sectionRef.current);
    };

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="bg-white px-4 py-20 transition-colors duration-300 sm:px-6 lg:px-8 dark:bg-gray-800"
            aria-labelledby="projects-heading"
        >
            <div className="mx-auto max-w-7xl">
                <motion.h2
                    id="projects-heading"
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    variants={fadeInUp}
                    className="mb-12 text-center text-3xl font-bold sm:text-4xl dark:text-white"
                >
                    {title}
                </motion.h2>

                <ul className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleProjects.map((project, index) => (
                        <motion.li
                            key={project.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={VIEWPORT_ONCE}
                            variants={fadeInUp}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            <ProjectCard project={project} />
                        </motion.li>
                    ))}
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
            </div>
        </section>
    );
}
