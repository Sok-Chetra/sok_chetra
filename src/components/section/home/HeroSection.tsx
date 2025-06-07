'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
    return (
        <section className="relative h-auto min-[321px]:h-screen  flex items-center justify-center py-30 min-[321px]:py-0 px-4 min-[321px]:px-6 lg:px-8 inset-0  transition-all duration-500">


            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-2 md:order-1"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 dark:text-white text-center md:text-start">
                        Sok Chetra — <span className="text-blue-600 dark:text-blue-400">Full Stack</span> Developer
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 text-center md:text-start dark:text-gray-300 mb-8">
                        Available for freelance &amp; work — let&apos;s build something amazing.
                    </p>
                    <div className='md:block flex justify-center'>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='inline-block'
                        >
                            <Link
                                href="/portfolio"
                                className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                            >
                                View Portfolio
                            </Link>
                        </motion.div>
                    </div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="order-1 md:order-2 flex justify-center"
                >
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-md dark:shadow-gray-800/20">
                        <Image
                            src="/image/my-profile.png"
                            alt="Sok Chetra"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    <Link
                        href="#projects"
                        aria-label="Scroll down to Projects section"
                    >
                        <svg
                            className="w-6 h-6 text-gray-600 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
