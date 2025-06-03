'use client';

import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};

export default function HeroSection() {
    return (
        <motion.section
            className="py-20 px-4 sm:px-6 lg:px-8 text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                    Let's <span className="text-indigo-600 dark:text-indigo-400">Connect</span>
                </h1>
                <motion.p
                    className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                    variants={itemVariants}
                >
                    I'd love to hear from you! Whether you have a project in mind or just want to say hello, feel free to reach out through any of these channels.
                </motion.p>
            </motion.div>
        </motion.section>
    );
}