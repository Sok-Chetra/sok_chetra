'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: {
        y: 30,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function HeroSection() {
    return (
        <motion.section
            className="pb-20 pt-48 px-4 sm:px-6 lg:px-8 text-center  dark:bg-gray-900"
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.div
                className="max-w-3xl mx-auto"
                variants={itemVariants}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                    variants={itemVariants}
                >
                    Let&apos;s <span className="text-indigo-600 dark:text-indigo-400">Connect</span>
                </motion.h1>
                <motion.p
                    className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                    variants={itemVariants}
                >
                    I&apos;d love to hear from you! Whether you have a project in mind or just want to say hello.
                </motion.p>
            </motion.div>

            <motion.div
                className="flex justify-center space-x-4"
                variants={itemVariants}
            >
                <Link
                    href={'/about-me'}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-500/20 dark:hover:shadow-indigo-400/20"
                >

                    Who Am I?

                </Link>
            </motion.div>

            {/* Animated divider with dark mode support */}
            <motion.div
                className="w-16 h-1 bg-indigo-600 dark:bg-indigo-400 mx-auto mt-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                    delay: 0.8,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                }}
            />
        </motion.section>
    );
}