import HeroSection from '@/components/section/home/HeroSection'
import ProjectsSection from '@/components/section/home/ProjectsSection'
import ContactForm from '@/components/form/ContactForm'

export default function Home() {
    return (
        <main className="min-h-[100dvh] overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
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