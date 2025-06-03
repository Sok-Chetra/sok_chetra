import ContactCards from "@/components/section/contact-me/ContactCards";
import ContactFormSection from "@/components/section/contact-me/ContactFormSection";
import HeroSection from "@/components/section/contact-me/HeroSection";

export default function ContactMePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            <HeroSection />
            <ContactCards />
            <ContactFormSection />
        </main>
    );
}