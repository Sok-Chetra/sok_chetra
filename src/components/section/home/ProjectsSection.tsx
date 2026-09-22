"use client";

import { useRef, useState } from "react";

import ProjectCard from "./ProjectCard";
import Enter from "@/components/ui/Enter";
import { PROJECTS } from "@/lib/content/projects";
import { scrollToElement } from "@/lib/scroll";

/** Widest the CSS grid ever gets (`lg:grid-cols-3`). */
const MAX_COLUMNS = 3;

type ProjectsSectionProps = {
    title?: string;
    /** Rows of cards per page at the widest breakpoint. */
    rows?: number;
    /**
     * Preload the first card's image. Only for pages where this section starts
     * inside the opening view — on /portfolio that image is the LCP element.
     */
    prioritizeFirstImage?: boolean;
};

export default function ProjectsSection({
    title = "My Projects",
    rows = 1,
    prioritizeFirstImage = false,
}: ProjectsSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [page, setPage] = useState(1);

    /**
     * Fixed, not derived from the measured column count.
     *
     * Page size used to be `columns × rows`, where `columns` came from a hook
     * that starts at the mobile value so the server markup matches, then
     * corrects itself in an effect. On a desktop viewport that took the grid
     * from 2 cards to 6 straight after hydration, growing the section by 288px.
     *
     * That is not cosmetic: a document that is shorter at first paint than at
     * final layout cannot have its scroll position restored. Reloading partway
     * down the page made the browser clamp to the shorter height and then jump
     * once the grid filled in.
     *
     * Static HTML cannot know the viewport, so any viewport-derived page size
     * will always disagree with the server. Sizing pages for the widest
     * breakpoint keeps the served markup and every client render identical:
     * narrow screens show the same cards in more rows, which is what the CSS
     * grid already does.
     */
    const pageSize = MAX_COLUMNS * rows;
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
            className="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-gray-800"
            aria-labelledby="projects-heading"
        >
            <div className="mx-auto max-w-7xl">
                {/*
                  CSS entrance, not a whileInView reveal. On /portfolio this
                  heading lands ~640px down a 844px phone screen, inside the
                  first view, and a Framer reveal writes opacity:0 into the SSR
                  HTML — leaving it blank until hydration. The cards below it
                  are genuinely off screen and still reveal on scroll.
                */}
                <Enter
                    as="h2"
                    id="projects-heading"
                    className="mb-12 text-center text-3xl font-bold sm:text-4xl dark:text-white"
                >
                    {title}
                </Enter>

                <ul className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleProjects.map((project, index) => (
                        <Enter
                            as="li"
                            key={project.id}
                            delayMs={90 + index * 90}
                            className="h-full"
                        >
                            <ProjectCard
                                project={project}
                                priority={prioritizeFirstImage && index === 0}
                            />
                        </Enter>
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
