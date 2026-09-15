"use client";

import { m } from "framer-motion";

import { fadeInUp, VIEWPORT_ONCE } from "@/lib/animations";
import { SKILLS } from "@/lib/content/skills";

export default function SkillsSection() {
    return (
        <m.section
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            variants={fadeInUp}
            className="rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8 dark:bg-gray-800"
        >
            <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">Skills</h2>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {SKILLS.map((skill, index) => (
                    <m.li
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex min-w-0 items-center rounded-lg bg-blue-50 px-4 py-3 text-sm break-words md:text-base dark:bg-gray-700"
                    >
                        <span aria-hidden className="w-2 h-2 bg-blue-500 rounded-full mr-2 shrink-0" />
                        {skill}
                    </m.li>
                ))}
            </ul>
        </m.section>
    );
}
