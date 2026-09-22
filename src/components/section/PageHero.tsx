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
            {/*
              One animated element, not one per child. Each animating element
              needs its own compositor layer, rasterised exactly when the phone
              is busiest — parsing JS, hydrating, decoding images. Staggering
              the children looked better on a desktop and janked on a real
              handset.
            */}
            <Enter>
                <div className="mx-auto max-w-3xl">
                    <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
                        {title}
                    </h1>
                    <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">{description}</p>
                </div>

                {actions && (
                    <div className="flex flex-wrap items-center justify-center gap-4">{actions}</div>
                )}

                {showDivider && (
                    <div className="mx-auto mt-8 h-1 w-16 bg-indigo-600 dark:bg-indigo-400" />
                )}
            </Enter>
        </section>
    );
}
