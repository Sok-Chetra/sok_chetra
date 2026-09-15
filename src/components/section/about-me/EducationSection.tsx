"use client";

import { motion } from "framer-motion";

import { fadeInUp, VIEWPORT_ONCE } from "@/lib/animations";
import { EDUCATION } from "@/lib/content/education";

export default function EducationSection() {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeInUp}
            className="rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8 dark:bg-gray-800"
        >
            <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                Education
            </h2>

            <ul className="space-y-6">
                {EDUCATION.map((entry) => (
                    <motion.li
                        key={entry.id}
                        variants={fadeInUp}
                        className={`pl-4 border-l-4 ${entry.accentClass}`}
                    >
                        <div className="flex items-start gap-3">
                            <span aria-hidden className="md:text-xl mt-1">
                                {entry.icon}
                            </span>
                            <div>
                                <h3 className="md:text-xl font-semibold">{entry.degree}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{entry.institution}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{entry.status}</p>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </motion.section>
    );
}
