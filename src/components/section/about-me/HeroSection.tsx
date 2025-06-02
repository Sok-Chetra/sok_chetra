'use client';
import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center px-4">
            {/* Floating shapes (background) */}
            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -left-20 top-1/4 w-40 h-40 rounded-full bg-purple-400/10 blur-xl"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    x: [0, -10, 0]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute -right-20 bottom-1/4 w-60 h-60 rounded-full bg-blue-400/10 blur-xl"
            />

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
            </div>
        </section>
    );
}