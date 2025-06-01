import HeroSection from '@/components/section/about-me/HeroSection';
import EducationSection from '@/components/section/about-me/EducationSection';
import SkillsSection from '@/components/section/about-me/SkillsSection';
import WorkExperienceSection from '@/components/section/about-me/WorkExperienceSection';

export const metadata = {
    title: 'About Sok Chetra',
    description: 'About Sok Chetra - Full Stack Web Developer',
};

export default function AboutMe() {
    return (
        <main className="min-h-[100dvh] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <HeroSection />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
                <EducationSection />
                <SkillsSection />
                <WorkExperienceSection />
            </div>
        </main>
    );
}