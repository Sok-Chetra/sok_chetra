import type { Variants } from "motion/react";

import Reveal from "@/components/ui/Reveal";
import { popIn, staggerContainer } from "@/lib/animations";
import { TECHNOLOGIES } from "@/lib/content/technologies";

const headingIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TechnologiesSection() {
    return (
        <section className="py-16 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Reveal
                    as="h2"
                    variants={headingIn}
                    viewport="partial"
                    className="text-3xl font-bold text-center mb-12 dark:text-white"
                >
                    Technologies I Work With
                </Reveal>

                <Reveal
                    as="ul"
                    variants={staggerContainer}
                    viewport="partial"
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6"
                >
                    {TECHNOLOGIES.map((tech) => (
                        <Reveal
                            as="li"
                            trigger="inherit"
                            key={tech}
                            variants={popIn}
                            hover={{
                                scale: 1.05,
                                transition: { type: "spring", stiffness: 150, damping: 12 },
                            }}
                            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow duration-300"
                        >
                            <span
                                aria-hidden
                                className="w-12 h-12 mb-3 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 text-xl font-bold"
                            >
                                {tech[0]}
                            </span>
                            <span className="min-w-0 text-center font-medium break-words dark:text-white">{tech}</span>
                        </Reveal>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
