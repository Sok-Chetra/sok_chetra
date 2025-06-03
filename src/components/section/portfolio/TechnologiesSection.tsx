'use client';

import React from 'react'
import { motion } from 'framer-motion';

const techItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
            type: "spring",
            stiffness: 100
        }
    }
};

const TechnologiesSection = () => {
    return (
        <motion.section
            className="py-16 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12 dark:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Technologies I Work With
                </motion.h2>
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.3
                            }
                        }
                    }}
                >
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Framer Motion'].map((tech, index) => (
                        <motion.div
                            key={tech}
                            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all"
                            variants={techItemVariants}
                            whileHover={{ y: -5 }}
                            custom={index}
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
    )
}

export default TechnologiesSection