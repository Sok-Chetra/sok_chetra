
import ProjectsSection from "@/components/section/home/ProjectsSection";
import HeroSection from "@/components/section/portfolio/HeroSection";
import TechnologiesSection from "@/components/section/portfolio/TechnologiesSection";

export const metadata = {
    title: 'My Portfolio | Sok Chetra’s Creative Works',
    description: 'Explore Sok Chetra’s collection of professional projects, web applications, and creative development work using Next.js, React Native, and modern technologies.',
    keywords: [
        'Sok Chetra Portfolio',
        'Web Developer Projects',
        'Next.js Portfolio',
        'React Native Developer',
        'Full Stack Developer Cambodia',
        'Creative Projects',
        'TypeScript Developer',
        'Frontend and Backend Projects',
    ],
    authors: [{ name: 'Sok Chetra' }],
    creator: 'Sok Chetra',
    openGraph: {
        title: 'Sok Chetra | Developer Portfolio',
        description:
            'A showcase of Sok Chetra’s work as a full stack web developer. Browse modern web projects built with React, Next.js, TypeScript, and more.',
        url: 'https://sok-chetra.me/portfolio',
        siteName: 'Sok Chetra Portfolio',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/image/og-portfolio.png',
                width: 1200,
                height: 630,
                alt: 'Sok Chetra Portfolio Preview',
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sok Chetra | Developer Portfolio',
        description: 'Discover creative and professional projects by Sok Chetra.',
        images: ['https://sok-chetra.me/image/website.png'],
    },
};

export default function Portfolio() {

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            {/* Hero Section */}
            <HeroSection />

            {/* Rest of your component remains the same */}
            <div className="pb-32 px-4 sm:px-6 lg:px-8">
                <ProjectsSection
                    title="Featured Works"
                    itemsPerView={{ base: 2, sm: 2, md: 2, lg: 3, xl: 3 }}
                    overflowBehavior="pagination_number"
                    rows={2}
                />
            </div>

            <TechnologiesSection />
        </div>

    )
}