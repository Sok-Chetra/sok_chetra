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

export default function HeroSection() {
    return (
        <section
            className="relative h-[90vh] flex items-center justify-center px-4 inset-0  transition-all duration-500"
        >

            {/* Content */}
            <div className="text-center max-w-3xl relative z-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                        Sok Chetra
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8"
                >
                    Full Stack Developer
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="max-w-lg mx-auto"
                >
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                        Building digital experiences with <span className="font-medium text-purple-600">Next.js</span>,{' '}
                        <span className="font-medium text-blue-500">React Native</span>, and modern web technologies.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="mt-8 flex justify-center"
                >
                    <Link
                        href="/" // or change to "/about-me", "/" etc.
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                        Take Me Home
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}