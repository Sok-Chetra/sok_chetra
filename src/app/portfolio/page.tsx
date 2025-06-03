
import ProjectsSection from "@/components/section/home/ProjectsSection";
import HeroSection from "@/components/section/portfolio/HeroSection";
import TechnologiesSection from "@/components/section/portfolio/TechnologiesSection";

export const metadata = {
    title: 'My Portfolio | Creative Works',
    description: 'Explore my collection of projects and creative works',
};

export default function Portfolio() {

    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            {/* Hero Section */}
            <HeroSection />

            {/* Rest of your component remains the same */}
            <div className="pb-32 px-4 sm:px-6 lg:px-8">
                <ProjectsSection
                    title="Featured Works"
                    itemsPerView={{ base: 2, sm: 2, md: 2, lg: 3, xl: 3 }}
                    overflowBehavior="pagination_number"
                    rows={2}
                />
            </div>

            <TechnologiesSection />
        </div>

    )
}