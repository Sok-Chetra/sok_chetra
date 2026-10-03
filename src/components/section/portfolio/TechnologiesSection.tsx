import Reveal from "@/components/ui/Reveal";
import { TECHNOLOGIES } from "@/lib/content/technologies";

export default function TechnologiesSection() {
    return (
        <section className="py-16 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Reveal
                    as="h2"
                    variant="heading"
                    viewport="partial"
                    touch="none"
                    className="text-3xl font-bold text-center mb-12 dark:text-white"
                >
                    Technologies I Work With
                </Reveal>

                <Reveal
                    as="ul"
                    variant="none"
                    viewport="partial"
                    stagger={{ delayMs: 200, stepMs: 80 }}
                    touch="none"
                    className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-6"
                >
                    {TECHNOLOGIES.map((tech, index) => (
                        <Reveal
                            as="li"
                            trigger="inherit"
                            variant="pop"
                            order={index}
                            key={tech}
                            // The hover was a Framer spring; this easing
                            // overshoots the same way, without JavaScript.
                            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-[scale,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:shadow-lg"
                        >
                            <span
                                aria-hidden
                                className="w-12 h-12 mb-3 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 text-xl font-bold"
                            >
                                {tech[0]}
                            </span>
                            <span className="min-w-0 text-center font-medium break-words dark:text-white">{tech}</span>
                        </Reveal>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
