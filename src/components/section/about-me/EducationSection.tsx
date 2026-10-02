import Reveal from "@/components/ui/Reveal";
import { EDUCATION } from "@/lib/content/education";

export default function EducationSection() {
    return (
        <Reveal
            as="section"
            className="rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8 dark:bg-gray-800"
        >
            <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">
                Education
            </h2>

            <ul className="space-y-6">
                {EDUCATION.map((entry) => (
                    <Reveal
                        as="li"
                        trigger="inherit"
                        key={entry.id}
                        className={`pl-4 border-l-4 ${entry.accentClass}`}
                    >
                        <div className="flex items-start gap-3">
                            <span aria-hidden className="md:text-xl mt-1">
                                {entry.icon}
                            </span>
                            <div>
                                <h3 className="md:text-xl font-semibold">{entry.degree}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{entry.institution}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{entry.status}</p>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </ul>
        </Reveal>
    );
}
