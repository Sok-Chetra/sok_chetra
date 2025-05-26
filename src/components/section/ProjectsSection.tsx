'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import ProjectCard from './ProjectCard'
import { projects, ProjectsSectionProps } from '@/lib/mock/projects'

export default function ProjectsSection({
    itemsPerView = 3,
    overflowBehavior = 'slide',
    rows = 1
}: ProjectsSectionProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    ref={ref}
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl font-bold mb-12 text-center dark:text-white"
                >
                    My Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.slice(0, itemsPerView * rows).map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            style={{
                                transform: `translateX(${index % 2 === 0 ? '-' : ''}${(index % 3) * 10}px) translateY(${(index % 3) * 10}px)`
                            }}
                            className="relative"
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>

                {overflowBehavior === 'pagination_number' && projects.length > itemsPerView * rows && (
                    <div className="flex justify-center mt-12">
                        <div className="flex space-x-2">
                            {Array.from({ length: Math.ceil(projects.length / (itemsPerView * rows)) }).map((_, i) => (
                                <button
                                    key={i}
                                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}