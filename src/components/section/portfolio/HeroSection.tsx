'use client';

import ButtonCV from '@/components/ui/ButtonCV';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3, // Added initial delay before animation starts
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
            duration: 0.6, // Slightly longer duration
            ease: "easeOut", // Smoother easing
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
            viewport={{ once: true, margin: "-100px" }} // Only animate once
        >
            <motion.div
                className="max-w-3xl mx-auto"
                variants={itemVariants}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                    variants={itemVariants}
                >
                    My Creative <span className="text-indigo-600 dark:text-indigo-400">Portfolio</span>
                </motion.h1>
                <motion.p
                    className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                    variants={itemVariants}
                >
                    A curated collection of my projects, showcasing my skills and creative process.
                </motion.p>
            </motion.div>


            <motion.div
                className="flex justify-center space-x-4"
                variants={itemVariants}
            >
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg">
                    Contact Me
                </button>
                <ButtonCV />
            </motion.div>

            {/* Adding an animated divider that appears last */}
            <motion.div
                className="w-16 h-1 bg-indigo-600 mx-auto mt-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                    delay: 1.2, // Appears after text
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                }}
            />
        </motion.section>
    );
}