"use client";

import { motion } from "framer-motion";

import { fadeInUp, VIEWPORT_ONCE } from "@/lib/animations";
import { EXPERIENCE } from "@/lib/content/experience";

export default function WorkExperienceSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeInUp}
            className="rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8 dark:bg-gray-800"
        >
            <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                Work Experience
            </h2>

            <div className="space-y-8">
                {EXPERIENCE.map((job) => (
                    <motion.article
                        key={job.id}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="group relative border-l-2 border-purple-500 pb-2 pl-5 sm:pl-8"
                    >
                        <span
                            aria-hidden
                            className="absolute w-4 h-4 rounded-full bg-purple-500 -left-2 top-1 group-hover:scale-150 transition-transform"
                        />

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <h3 className="text-xl font-bold">{job.company}</h3>
                            <span aria-hidden className="hidden sm:block">
                                •
                            </span>
                            <p className="text-gray-600 dark:text-gray-400">{job.position}</p>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{job.period}</p>

                        <ul className="space-y-3">
                            {job.responsibilities.map((item) => (
                                <li key={item} className="flex items-start">
                                    <span aria-hidden className="text-purple-500 mr-2 mt-1">
                                        •
                                    </span>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm md:text-lg">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.article>
                ))}
            </div>
        </motion.section>
    );
}
