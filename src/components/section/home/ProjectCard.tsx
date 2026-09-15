'use client'

import { Project } from '@/lib/content/projects'
import { m } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type ProjectCardProps = {
    project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <m.div
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50 flex flex-col h-full"
        >
            {/* Image container with fixed aspect ratio */}
            <div className="relative h-48 w-full shrink-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    placeholder="blur"
                />
            </div>

            {/* Content area that grows to fill remaining space */}
            <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-semibold mb-2 dark:text-white line-clamp-2">
                    {project.title}
                </h3>

                {/* Tags container with scroll if needed */}
                <div className="flex flex-wrap gap-1 mb-4 max-h-20 overflow-y-auto">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-gray-600 dark:text-gray-100 text-xs font-medium rounded-full whitespace-nowrap"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                {project.description && (
                    <div>
                        <p>{project.description}</p>
                    </div>
                )}


                {/* Link pushed to bottom */}
                {project.link && (
                    <div className="mt-auto">
                        <Link
                            href={project.link}
                            className="inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
                            aria-label='Link to Project Detail'
                        >
                            View Project →
                        </Link>
                    </div>
                )}
            </div>
        </m.div>
    )
}