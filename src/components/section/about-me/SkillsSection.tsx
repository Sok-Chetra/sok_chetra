'use client'

import { motion } from 'framer-motion';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function SkillsSection() {
    const skills = ['Next.js', 'Tailwind CSS', 'React Native', 'Git', 'WordPress', 'Laravel', 'Docker'];

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
            <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-blue-50 dark:bg-gray-700 px-4 py-3 text-sm md:text-base rounded-lg flex items-center"
                    >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {skill}
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}