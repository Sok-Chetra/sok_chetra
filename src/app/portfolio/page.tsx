
import ProjectsSection from "@/components/section/home/ProjectsSection";
import HeroSection from "@/components/section/portfolio/HeroSection";
import TechnologiesSection from "@/components/section/portfolio/TechnologiesSection";

export const metadata = {
    title: 'My Portfolio | Creative Works',
    description: 'Explore my collection of projects and creative works',
};

export default function Portfolio() {

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
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