import ProjectCard from "./ProjectCard";
import ProjectsPager from "./ProjectsPager";
import Enter from "@/components/ui/Enter";
import { PROJECTS } from "@/lib/content/projects";

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

/**
 * A server component, with only the paging handed to ProjectsPager.
 *
 * This used to be a client component, for nothing more than the page buttons —
 * and a client component takes everything it imports into the browser bundle.
 * That meant ProjectCard, its icons, and the whole PROJECTS list: every
 * overview paragraph, role and highlight of every project, downloaded by the
 * home and portfolio pages although they only ever show the card summaries.
 * Now the cards are rendered here and passed to the pager as finished output.
 */
export default function ProjectsSection({
    title = "My Projects",
    rows = 1,
    prioritizeFirstImage = false,
}: ProjectsSectionProps) {
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

    const pages = [];
    for (let start = 0; start < PROJECTS.length; start += pageSize) {
        const isFirstPage = start === 0;
        pages.push(
            PROJECTS.slice(start, start + pageSize).map((project, index) => (
                // `lift`, not the default `rise`: these must not fade, because
                // on /portfolio the first card's image is the measured LCP
                // element.
                <Enter
                    as="li"
                    animation="lift"
                    key={project.id}
                    delayMs={90 + index * 90}
                    className="h-full"
                >
                    <ProjectCard
                        project={project}
                        priority={prioritizeFirstImage && isFirstPage && index === 0}
                    />
                </Enter>
            ))
        );
    }

    return (
        <section
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

                <ProjectsPager pages={pages} />
            </div>
        </section>
    );
}
