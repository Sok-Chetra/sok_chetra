'use client';

import ButtonCV from '@/components/ui/ButtonCV';
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
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

export default function HeroSection() {
    return (
        <motion.section
            className="pb-20 pt-48 px-4 sm:px-6 lg:px-8 text-center bg-white dark:bg-gray-900 transition-colors duration-300"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
        >
            {/* Heading & Text */}
            <motion.div className="max-w-3xl mx-auto" variants={itemVariants}>
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                    variants={itemVariants}
                >
                    My Creative{' '}
                    <span className="text-indigo-600 dark:text-indigo-400">Portfolio</span>
                </motion.h1>
                <motion.p
                    className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                    variants={itemVariants}
                >
                    A curated collection of my projects, showcasing my skills and creative process.
                </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex justify-center space-x-4" variants={itemVariants}>
                <Link
                    href="/contact-me"
                    className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                    Contact Me
                </Link>
                <ButtonCV />
            </motion.div>

            {/* Animated Divider */}
            <motion.div
                className="w-16 h-1 bg-indigo-600 mx-auto mt-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                    delay: 1.2,
                    duration: 0.8,
                    type: 'spring',
                    stiffness: 100,
                    damping: 10,
                }}
            />
        </motion.section>
    );
}
