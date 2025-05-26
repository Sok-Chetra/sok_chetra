export type Project = {
    id: number
    title: string
    image: string
    tags: string[]
    link: string
}

export type ProjectsSectionProps = {
    itemsPerView?: number
    overflowBehavior?: 'slide' | 'pagination_number'
    rows?: number
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'E-commerce Platform',
        image: '/project1.jpg',
        tags: ['Next.js', 'Tailwind CSS', 'Node.js'],
        link: '#'
    },
    {
        id: 2,
        title: 'Portfolio Website',
        image: '/project2.jpg',
        tags: ['React', 'Framer Motion', 'CSS'],
        link: '#'
    },
    {
        id: 3,
        title: 'Task Management App',
        image: '/project3.jpg',
        tags: ['TypeScript', 'Firebase', 'Material UI'],
        link: '#'
    },
    {
        id: 4,
        title: 'Weather Dashboard',
        image: '/project4.jpg',
        tags: ['React', 'API Integration', 'Chart.js'],
        link: '#'
    },
    {
        id: 5,
        title: 'Social Media Dashboard',
        image: '/project5.jpg',
        tags: ['Next.js', 'MongoDB', 'GraphQL'],
        link: '#'
    },
    {
        id: 6,
        title: 'Fitness Tracker',
        image: '/project6.jpg',
        tags: ['React Native', 'Firebase', 'Redux'],
        link: '#'
    }
]