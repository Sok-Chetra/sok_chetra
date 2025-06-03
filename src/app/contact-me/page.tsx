import ContactCards from "@/components/section/contact-me/ContactCards";
import ContactFormSection from "@/components/section/contact-me/ContactFormSection";
import HeroSection from "@/components/section/contact-me/HeroSection";

export default function ContactMePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-36">
            <HeroSection />
            <ContactCards />
            <ContactFormSection />
        </main>
    );
}