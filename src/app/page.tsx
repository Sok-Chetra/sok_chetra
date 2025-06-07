import HeroSection from '@/components/section/home/HeroSection'
import ProjectsSection from '@/components/section/home/ProjectsSection'
import ContactFormSection from '@/components/section/contact-me/ContactFormSection'

export const metadata = {
    title: 'Sok Chetra | Full Stack Web Developer',
    description:
        'Welcome to the personal website of Sok Chetra, a passionate Full Stack Developer skilled in Next.js, React Native, and modern web technologies. Explore my work, projects, and contact information.',
    keywords: [
        'Sok Chetra',
        'Full Stack Developer',
        'Next.js Developer',
        'React Native Developer',
        'Web Developer Cambodia',
        'Software Engineer',
        'Frontend Developer',
        'Backend Developer',
        'JavaScript Developer',
        'TypeScript Developer',
    ],
    authors: [{ name: 'Sok Chetra' }],
    creator: 'Sok Chetra',
    openGraph: {
        title: 'Sok Chetra | Full Stack Web Developer',
        description:
            'Discover the portfolio of Sok Chetra — building digital experiences with React, Next.js, and modern technologies.',
        url: 'https://sok-chetra.me', // 🔁 Replace with your actual domain
        siteName: 'Sok Chetra Portfolio',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: 'https://sok-chetra.me/image/og-my-profile.png',
                width: 1200,
                height: 630,
                alt: 'Sok Chetra Hero Banner',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sok Chetra | Full Stack Web Developer',
        description: 'Explore the work and projects of Sok Chetra, Full Stack Developer.',
        images: ['https://sok-chetra.me/image/og-my-profile.png'],
    },
};

export default function Home() {
    return (
        <main className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <HeroSection />
            <ProjectsSection
                itemsPerView={{ base: 2, sm: 2, md: 2, lg: 3, xl: 3 }}
                overflowBehavior="pagination_number"
                rows={2}
            />
            <ContactFormSection />
        </main>
    )
}