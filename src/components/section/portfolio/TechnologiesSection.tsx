"use client";

import { m } from "framer-motion";

import { popIn, staggerContainer, VIEWPORT_PARTIAL } from "@/lib/animations";
import { TECHNOLOGIES } from "@/lib/content/technologies";

export default function TechnologiesSection() {
    return (
        <m.section
            className="py-16 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_PARTIAL}
        >
            <div className="max-w-7xl mx-auto">
                <m.h2
                    className="text-3xl font-bold text-center mb-12 dark:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={VIEWPORT_PARTIAL}
                >
                    Technologies I Work With
                </m.h2>

                <m.ul
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={VIEWPORT_PARTIAL}
                >
                    {TECHNOLOGIES.map((tech) => (
                        <m.li
                            key={tech}
                            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow duration-300"
                            variants={popIn}
                            whileHover={{
                                scale: 1.05,
                                transition: { type: "spring", stiffness: 150, damping: 12 },
                            }}
                        >
                            <span
                                aria-hidden
                                className="w-12 h-12 mb-3 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 text-xl font-bold"
                            >
                                {tech[0]}
                            </span>
                            <span className="min-w-0 text-center font-medium break-words dark:text-white">{tech}</span>
                        </m.li>
                    ))}
                </m.ul>
            </div>
        </m.section>
    );
}
