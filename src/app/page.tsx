import HeroSection from '@/components/section/HeroSection'
import ProjectsSection from '@/components/section/ProjectsSection'
import ContactForm from '@/components/form/ContactForm'

export default function Home() {
    return (
        <main className="min-h-screen overflow-hidden">
            <HeroSection />
            <ProjectsSection
                itemsPerView={{ base: 2, sm: 2, md: 2, lg: 3, xl: 3 }}
                overflowBehavior="pagination_number"
                rows={2}
            />
            <ContactForm />
        </main>
    )
}