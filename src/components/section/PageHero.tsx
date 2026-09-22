import type { ReactNode } from "react";

import Enter from "@/components/ui/Enter";

type PageHeroProps = {
    /** Accepts markup so a word can be colour-accented. */
    title: ReactNode;
    description: ReactNode;
    /** Call-to-action row rendered under the copy. */
    actions?: ReactNode;
    showDivider?: boolean;
};

/**
 * Shared hero for interior pages. The portfolio and contact heroes were
 * separate ~80-line files with the same structure and variants; they now differ
 * only in their copy.
 *
 * Entrance is CSS, not Framer Motion — this is the first thing a visitor sees,
 * so it must not wait for hydration. See @/components/ui/Enter.
 *
 * The section carries no `transition-*` class, matching the home hero. It had
 * `transition-colors duration-300`, and the home hero — the one page never
 * reported as janky — has none. A transition on a full-width section re-runs
 * whenever a watched property changes, and the webfont swapping in around
 * 960ms does exactly that, mid-entrance. `transition-all` is worse still: it
 * watches layout properties, so the swap forces layout every frame. Keep
 * transitions on small interactive elements, not on page sections.
 */
export default function PageHero({
    title,
    description,
    actions,
    showDivider = true,
}: PageHeroProps) {
    return (
        <section className="px-4 pt-32 pb-20 text-center sm:px-6 md:pt-48 lg:px-8">
            {/*
              Heading and description are separate blocks so this cascades the
              same four steps as the about-me hero, rather than moving the copy
              as a single lump.
            */}
            <Enter
                as="h1"
                className="mx-auto mb-6 max-w-3xl text-4xl font-bold text-gray-900 md:text-5xl dark:text-white"
            >
                {title}
            </Enter>

            <Enter
                as="p"
                step={1}
                className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300"
            >
                {description}
            </Enter>

            {actions && (
                <Enter step={2} className="flex flex-wrap items-center justify-center gap-4">
                    {actions}
                </Enter>
            )}

            {showDivider && (
                <Enter
                    animation="line"
                    step={3}
                    className="mx-auto mt-8 h-1 w-16 bg-indigo-600 dark:bg-indigo-400"
                />
            )}
        </section>
    );
}
