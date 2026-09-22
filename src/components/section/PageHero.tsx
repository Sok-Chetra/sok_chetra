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
 */
export default function PageHero({
    title,
    description,
    actions,
    showDivider = true,
}: PageHeroProps) {
    return (
        <section className="px-4 pt-32 pb-20 text-center transition-colors duration-300 sm:px-6 md:pt-48 lg:px-8">
            <Enter step={1} className="mx-auto max-w-3xl">
                <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
                    {title}
                </h1>
                <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">{description}</p>
            </Enter>

            {actions && (
                <Enter step={2} className="flex flex-wrap items-center justify-center gap-4">
                    {actions}
                </Enter>
            )}

            {showDivider && (
                <Enter
                    animation="line"
                    className="mx-auto mt-8 h-1 w-16 bg-indigo-600 dark:bg-indigo-400"
                />
            )}
        </section>
    );
}
