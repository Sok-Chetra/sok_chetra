import type { ReactNode } from "react";

import Reveal from "@/components/ui/Reveal";
import { growLine, staggerContainer, staggerItem } from "@/lib/animations";

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
 */
export default function PageHero({
    title,
    description,
    actions,
    showDivider = true,
}: PageHeroProps) {
    return (
        <Reveal
            as="section"
            trigger="mount"
            variants={staggerContainer}
            className="px-4 pt-32 pb-20 text-center transition-colors duration-300 sm:px-6 md:pt-48 lg:px-8"
        >
            <Reveal variants={staggerItem} className="mx-auto max-w-3xl">
                <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
                    {title}
                </h1>
                <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">{description}</p>
            </Reveal>

            {actions && (
                <Reveal
                    variants={staggerItem}
                    className="flex flex-wrap items-center justify-center gap-4"
                >
                    {actions}
                </Reveal>
            )}

            {showDivider && (
                <Reveal
                    variants={growLine}
                    className="mx-auto mt-8 h-1 w-16 bg-indigo-600 dark:bg-indigo-400"
                />
            )}
        </Reveal>
    );
}
