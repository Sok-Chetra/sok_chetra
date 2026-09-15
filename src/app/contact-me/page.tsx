import ContactCards from "@/components/section/contact-me/ContactCards";
import ContactFormSection from "@/components/section/contact-me/ContactFormSection";
import HeroSection from "@/components/section/contact-me/HeroSection";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
    title: "Contact — Hire a Developer in Cambodia",
    description:
        "Get in touch with Sok Chetra, a full stack web and mobile developer in Phnom Penh, Cambodia — available for freelance, contract, and full-time work.",
    path: "/contact-me",
    keywords: ["Contact Sok Chetra", "Web Developer Contact", "Freelance Web Developer"],
    image: "/image/og-contact-me.jpg",
    imageAlt: "Contact Sok Chetra Banner",
    ogDescription: "Reach out to Sok Chetra for development projects, questions, or collaborations.",
    twitterDescription: "Let’s connect for web development projects and opportunities.",
});

export default function ContactMePage() {
    return (
        <main className="min-h-screen overflow-hidden bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <HeroSection />
            <ContactCards />
            <ContactFormSection />
        </main>
    );
}
