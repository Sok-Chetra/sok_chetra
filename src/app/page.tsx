import HeroSection from '@/components/section/HeroSection'
import ProjectsSection from '@/components/section/ProjectsSection'
import ContactForm from '@/components/form/ContactForm'

export default function Home() {
    return (
        <main className="min-h-screen">
            <HeroSection />
            <ProjectsSection
                itemsPerView={3}
                overflowBehavior="slide"
                rows={2}
            />
            <ContactForm />
        </main>
    )
}