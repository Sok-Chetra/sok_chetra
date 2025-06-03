'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

type ProjectCardProps = {
    project: {
        id: number
        title: string
        image: string
        tags: string[]
        link: string
    }
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/50"
        >
            <div className="relative h-48 w-full">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
                <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-gray-600 dark:text-gray-100 text-xs font-medium rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <Link
                    href={project.link}
                    className="inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
                >
                    View Project →
                </Link>
            </div>
        </motion.div>
    )
}