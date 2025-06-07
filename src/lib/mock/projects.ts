// 1. Import the type from Next.js
import type { StaticImageData } from 'next/image'

// 2. Import images
import homekongImage from '../../../public/image/projects/homekong.png'
import goodfoodImage from '../../../public/image/projects/goodfood.png'
import priviliWebImage from '../../../public/image/projects/privili-web.png'
import priviliAppImage from '../../../public/image/projects/privili-app.png'

// 3. Update type to use StaticImageData
export type Project = {
    id: number
    title: string
    image: StaticImageData
    tags: string[]
    link: string
    desc: string
}

export type ProjectsSectionProps = {
    itemsPerView?: number
    overflowBehavior?: 'slide' | 'pagination_number'
    rows?: number
}

// 4. Use images
export const projects: Project[] = [
    {
        id: 1,
        title: 'Homekong',
        image: homekongImage,
        tags: ['Next.js', 'Tailwind CSS', 'Node.js', 'Docker'],
        link: '',
        desc: ''
    },
    {
        id: 2,
        title: 'GoodFood',
        image: goodfoodImage,
        tags: ['WordPress', 'Woocommerce', 'Polylang'],
        link: '',
        desc: ''
    },
    {
        id: 3,
        title: 'Privili Web',
        image: priviliWebImage,
        tags: ['WordPress', 'Woocommerce', 'Polylang'],
        link: '',
        desc: ''
    },
    {
        id: 4,
        title: 'Privili App',
        image: priviliAppImage,
        tags: ['React Native', 'Woocommerce', 'Polylang'],
        link: '',
        desc: ''
    },
]
