import HeroSection from "@/components/section/portfolio/HeroSection";
import ProjectsSection from "@/components/section/home/ProjectsSection";
import TechnologiesSection from "@/components/section/portfolio/TechnologiesSection";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
    title: "Portfolio — Web & Mobile Projects",
    description:
        "Web and mobile projects built by Sok Chetra, a full stack developer in Cambodia, using Next.js, React Native, WordPress, and TypeScript.",
    path: "/portfolio",
    keywords: ["Sok Chetra Portfolio", "Web Developer Projects", "Next.js Portfolio", "Creative Projects"],
    image: "/image/og-portfolio.png",
    imageAlt: "Sok Chetra Portfolio Preview",
    ogDescription:
        "A showcase of Sok Chetra’s work as a full stack web developer. Browse modern web projects built with React, Next.js, TypeScript, and more.",
    twitterDescription: "Discover creative and professional projects by Sok Chetra.",
});

export default function PortfolioPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <HeroSection />

            <div className="pb-32">
                <ProjectsSection title="Featured Works" rows={2} />
            </div>

            <TechnologiesSection />
        </main>
    );
}
