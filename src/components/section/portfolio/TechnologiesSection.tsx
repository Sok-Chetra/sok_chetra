'use client';

import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.08,
            delayChildren: 0.2,
        },
    },
};

const techItemVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 10 },
    visible: {
        scale: 1,
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
};

const TechnologiesSection = () => {
    const technologies = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Framer Motion'];

    return (
        <motion.section
            className="py-16 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12 dark:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    Technologies I Work With
                </motion.h2>

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {technologies.map((tech) => (
                        <motion.div
                            key={tech}
                            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow duration-300"
                            variants={techItemVariants}
                            whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 150, damping: 12 } }}
                        >
                            <div className="w-12 h-12 mb-3 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">{tech[0]}</span>
                            </div>
                            <span className="font-medium dark:text-white text-center">{tech}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TechnologiesSection;
