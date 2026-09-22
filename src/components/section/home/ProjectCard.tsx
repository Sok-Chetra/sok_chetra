import { Project } from '@/lib/content/projects'
import Image from 'next/image'
import Link from 'next/link'

type ProjectCardProps = {
    project: Project
    /**
     * Set for the first card on /portfolio, where it sits in the opening view
     * and is the measured LCP element. next/image lazy-loads by default, which
     * delayed that fetch until after layout. Left off on the home page, where
     * this section is below the fold and the hero portrait is the LCP.
     */
    priority?: boolean
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
    // Hover lift is CSS. This was `m.div whileHover={{ y: -10 }}`, which made
    // every card a client component and shipped Framer Motion to hydrate a
    // hover effect the compositor does for free.
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2.5 hover:shadow-xl dark:bg-gray-700 dark:hover:shadow-gray-900/50">
            {/* Image container with fixed aspect ratio */}
            <div className="relative h-48 w-full shrink-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    placeholder="blur"
                    priority={priority}
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
        </div>
    )
}