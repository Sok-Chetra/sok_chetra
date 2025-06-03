
import ProjectsSection from "@/components/section/home/ProjectsSection";
import ButtonCV from "@/components/ui/ButtonCV";

export const metadata = {
    title: 'My Portfolio | Creative Works',
    description: 'Explore my collection of projects and creative works',
};

export default function Portfolio() {

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20 overflow-hidden">
                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-300 mb-6">
                            My Creative Portfolio
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                            A curated collection of my projects, showcasing my skills and creative process.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all transform hover:scale-105 shadow-lg">
                                Contact Me
                            </button>
                            <ButtonCV />
                        </div>
                    </div>
                </section>

                {/* Rest of your component remains the same */}
                <div className="pb-32 px-4 sm:px-6 lg:px-8">
                    <ProjectsSection
                        title="Featured Works"
                        itemsPerView={{ base: 2, sm: 2, md: 2, lg: 3, xl: 3 }}
                        overflowBehavior="pagination_number"
                        rows={2}
                    />
                </div>

                <section className="py-16 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Technologies I Work With</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                                <div key={tech} className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all">
                                    <div className="w-12 h-12 mb-3 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 dark:text-blue-300 text-xl font-bold">{tech[0]}</span>
                                    </div>
                                    <span className="font-medium dark:text-white text-center">{tech}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}