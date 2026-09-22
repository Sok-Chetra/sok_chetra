import Enter from "@/components/ui/Enter";
import { SKILLS } from "@/lib/content/skills";

/**
 * Server component. Entrance is CSS rather than a `whileInView` reveal.
 *
 * On a 390x844 phone this card starts ~150px inside the first screen, and a
 * Framer `whileInView` reveal writes `opacity: 0` into the SSR HTML — so that
 * band sat blank from 324ms until hydration reached it at 1454ms, finishing
 * its fade at 2107ms. The sections below this one are genuinely off screen and
 * keep their scroll reveals.
 */
export default function SkillsSection() {
    return (
        <Enter
            as="section"
            className="rounded-2xl bg-white p-5 shadow-lg sm:p-6 md:p-8 dark:bg-gray-800"
        >
            <h2 className="mb-6 text-2xl font-bold text-purple-600 dark:text-purple-400">Skills</h2>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {SKILLS.map((skill, index) => (
                    <Enter
                        as="li"
                        key={skill}
                        delayMs={100 + index * 60}
                        className="flex min-w-0 items-center rounded-lg bg-blue-50 px-4 py-3 text-sm break-words md:text-base dark:bg-gray-700"
                    >
                        <span aria-hidden className="mr-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        {skill}
                    </Enter>
                ))}
            </ul>
        </Enter>
    );
}
