import EducationSection from "@/components/section/about-me/EducationSection";
import HeroSection from "@/components/section/about-me/HeroSection";
import SkillsSection from "@/components/section/about-me/SkillsSection";
import WorkExperienceSection from "@/components/section/about-me/WorkExperienceSection";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
    title: "About Me",
    description:
        "Learn more about Sok Chetra, a passionate Full Stack Developer with expertise in Next.js, React Native, TypeScript, and modern web technologies.",
    path: "/about-me",
    keywords: ["About Sok Chetra", "Software Engineer Profile"],
    ogType: "profile",
    ogDescription:
        "Discover the background, experience, and tech journey of Sok Chetra, a full stack web developer skilled in modern JavaScript frameworks.",
    twitterDescription: "Get to know Sok Chetra, his journey, skills, and professional background.",
    imageAlt: "Sok Chetra About Page Banner",
});

export default function AboutMePage() {
    return (
        <main className="min-h-screen overflow-hidden bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <HeroSection />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
                <SkillsSection />
                <WorkExperienceSection />
                <EducationSection />
            </div>
        </main>
    );
}
