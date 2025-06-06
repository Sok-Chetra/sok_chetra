import HeroSection from '@/components/section/about-me/HeroSection';
import EducationSection from '@/components/section/about-me/EducationSection';
import SkillsSection from '@/components/section/about-me/SkillsSection';
import WorkExperienceSection from '@/components/section/about-me/WorkExperienceSection';

export const metadata = {
    title: 'About Sok Chetra | Full Stack Web Developer',
    description:
        'Learn more about Sok Chetra, a passionate Full Stack Developer with expertise in Next.js, React Native, TypeScript, and modern web technologies.',
    keywords: [
        'Sok Chetra',
        'About Sok Chetra',
        'Full Stack Developer',
        'Next.js Developer',
        'React Native Developer',
        'Web Developer Cambodia',
        'Frontend Developer',
        'Backend Developer',
        'Software Engineer Profile',
    ],
    authors: [{ name: 'Sok Chetra' }],
    creator: 'Sok Chetra',
    openGraph: {
        title: 'About Sok Chetra | Full Stack Web Developer',
        description:
            'Discover the background, experience, and tech journey of Sok Chetra, a full stack web developer skilled in modern JavaScript frameworks.',
        url: 'https://sok-chetra.me/about-me', // 🔁 Replace with your actual domain
        siteName: 'Sok Chetra Portfolio',
        locale: 'en_US',
        type: 'profile',
        images: [
            {
                url: 'https://sok-chetra.me/image/my-profile-close.jpeg',
                alt: 'Sok Chetra About Page Banner',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Sok Chetra | Full Stack Developer',
        description: 'Get to know Sok Chetra, his journey, skills, and professional background.',
        images: ['https://sok-chetra.me/image/my-profile-close.jpeg'],
    },
};

export default function AboutMe() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            <HeroSection />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
                <EducationSection />
                <SkillsSection />
                <WorkExperienceSection />
            </div>
        </main>
    );
}