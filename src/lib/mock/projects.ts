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
        image: 'https://i.pinimg.com/736x/ff/ee/6f/ffee6f1778cf00df3606fe1207d88041.jpg',
        tags: ['Next.js', 'Tailwind CSS', 'Node.js'],
        link: '#'
    },
    {
        id: 2,
        title: 'Portfolio Website',
        image: 'https://i.pinimg.com/736x/5b/ef/14/5bef147ca7b631f70c6d6e4c392cea3b.jpg',
        tags: ['React', 'Framer Motion', 'CSS'],
        link: '#'
    },
    {
        id: 3,
        title: 'Task Management App',
        image: 'https://i.pinimg.com/736x/cc/e9/4e/cce94e6d1fbd2794a1df79739a586dbc.jpg',
        tags: ['TypeScript', 'Firebase', 'Material UI'],
        link: '#'
    },
    {
        id: 4,
        title: 'Weather Dashboard',
        image: 'https://i.pinimg.com/736x/f6/a0/e5/f6a0e520b081d6af0ce3ea8248f4d237.jpg',
        tags: ['React', 'API Integration', 'Chart.js'],
        link: '#'
    },
    {
        id: 5,
        title: 'Social Media Dashboard',
        image: 'https://i.pinimg.com/736x/d5/48/b3/d548b34176cbc26972bfc58a54d9ee27.jpg',
        tags: ['Next.js', 'MongoDB', 'GraphQL'],
        link: '#'
    },
    {
        id: 6,
        title: 'Fitness Tracker',
        image: 'https://i.pinimg.com/736x/ae/5f/90/ae5f90df0605c9939ea8d4bfe6876e7a.jpg',
        tags: ['React Native', 'Firebase', 'Redux'],
        link: '#'
    }
]