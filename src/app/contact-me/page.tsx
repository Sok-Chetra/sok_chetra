import ContactCards from "@/components/section/contact-me/ContactCards";
import ContactFormSection from "@/components/section/contact-me/ContactFormSection";
import HeroSection from "@/components/section/contact-me/HeroSection";

export const metadata = {
    title: 'Contact Sok Chetra',
    description: 'Get in touch with Sok Chetra, a passionate Full Stack Web Developer. Whether it’s project collaboration, freelance inquiries, or tech discussion — let’s connect.',
    keywords: [
        'Sok Chetra',
        'Contact Sok Chetra',
        'Full Stack Developer',
        'Next.js Developer',
        'Web Developer Contact',
        'React Developer',
        'Freelance Web Developer',
        'Software Engineer Cambodia'
    ],
    authors: [{ name: 'Sok Chetra' }],
    creator: 'Sok Chetra',
    openGraph: {
        title: 'Contact Sok Chetra',
        description: 'Reach out to Sok Chetra for development projects, questions, or collaborations.',
        url: 'https://sok-chetra.me/contact-me',
        siteName: 'Sok Chetra Portfolio',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/image/contact-mail.png',
                width: 1200,
                height: 630,
                alt: 'Contact Sok Chetra Banner',
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Sok Chetra',
        description: 'Let’s connect for web development projects and opportunities.',
        images: ['https://sok-chetra.me/image/contact-mail.png'],
    }
};


export default function ContactMePage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            <HeroSection />
            <ContactCards />
            <ContactFormSection />
        </main>
    );
}