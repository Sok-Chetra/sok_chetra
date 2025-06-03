'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import ProjectCard from './ProjectCard'
import { projects, ProjectsSectionProps } from '@/lib/mock/projects'
import { useRouter } from 'next/navigation'

type ResponsiveItemsPerView = {
    base?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
}

type UpdatedProjectsSectionProps = Omit<ProjectsSectionProps, 'itemsPerView'> & {
    itemsPerView?: number | ResponsiveItemsPerView
    title?: string;
}

export default function ProjectsSection({
    itemsPerView = { base: 1, sm: 1, md: 2, lg: 3, xl: 3 },
    overflowBehavior = 'slide',
    rows = 1,
    title
}: UpdatedProjectsSectionProps) {
    const ref = useRef(null)
    const router = useRouter()
    const gridRef = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const isGridInView = useInView(gridRef, { once: true, margin: '-100px' })
    const [currentPage, setCurrentPage] = useState(1)
    const [currentItemsPerView, setCurrentItemsPerView] = useState(1) // Start with smallest value

    const calculateItemsPerView = useCallback(() => {
        if (typeof itemsPerView === 'number') {
            return itemsPerView;
        }

        const width = window.innerWidth;
        if (width >= 1280) return itemsPerView.xl || itemsPerView.lg || itemsPerView.md || itemsPerView.sm || itemsPerView.base || 3;
        if (width >= 1024) return itemsPerView.lg || itemsPerView.md || itemsPerView.sm || itemsPerView.base || 3;
        if (width >= 768) return itemsPerView.md || itemsPerView.sm || itemsPerView.base || 2;
        if (width >= 640) return itemsPerView.sm || itemsPerView.base || 1;
        return itemsPerView.base || 1;
    }, [itemsPerView]);

    useEffect(() => {
        const handleResize = () => {
            setCurrentItemsPerView(calculateItemsPerView());
        };

        handleResize(); // Call on mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [calculateItemsPerView]); // ✅ No more ESLint warning

    const totalItems = currentItemsPerView * rows
    const totalPages = Math.ceil(projects.length / totalItems)
    const startIndex = (currentPage - 1) * totalItems
    const visibleProjects = projects.slice(startIndex, startIndex + totalItems)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        router.push('#projects')
    }

    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    }[currentItemsPerView] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

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
                    {title ? title : 'My Projects'}
                </motion.h2>

                <div ref={gridRef} className={`grid ${gridCols} gap-8`}>
                    {visibleProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isGridInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}

                            className="relative"
                        >
                            <ProjectCard project={project} />
                        </motion.div>
                    ))}
                </div>

                {overflowBehavior === 'pagination_number' && totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                        <div className="flex space-x-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${currentPage === i + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
                                        }`}
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