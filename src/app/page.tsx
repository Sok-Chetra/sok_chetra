import ContactFormSection from "@/components/section/contact-me/ContactFormSection";
import HeroSection from "@/components/section/home/HeroSection";
import ProjectsSection from "@/components/section/home/ProjectsSection";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
    title: "Full Stack Web & Mobile Developer in Cambodia",
    description:
        "Sok Chetra — full stack web and mobile developer in Phnom Penh, Cambodia, building websites and mobile apps with Next.js, React Native, and TypeScript.",
    path: "/",
    keywords: ["Frontend Developer", "Backend Developer", "JavaScript Developer"],
    ogDescription:
        "Discover the portfolio of Sok Chetra — building digital experiences with React, Next.js, and modern technologies.",
    twitterDescription: "Explore the work and projects of Sok Chetra, Full Stack Developer.",
    imageAlt: "Sok Chetra Hero Banner",
});

export default function Home() {
    return (
        <main className="min-h-screen overflow-hidden bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <HeroSection />
            <ProjectsSection rows={2} />
            <ContactFormSection />
        </main>
    );
}
