import Link from "next/link";

import Enter from "@/components/ui/Enter";
import { SITE } from "@/lib/content/site";

/**
 * Entrance is CSS so it runs from first paint rather than waiting on
 * hydration — see @/components/ui/Enter.
 */
export default function HeroSection() {
    return (
        <section className="relative flex min-h-[80svh] items-center justify-center px-4 py-24 transition-all duration-500">
            <Enter className="relative z-10 max-w-3xl text-center">
                <h1 className="mb-6 text-5xl font-bold md:text-7xl">
                    <span className="bg-linear-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        {SITE.name}
                    </span>
                </h1>

                <p className="mb-8 text-xl text-gray-600 md:text-2xl dark:text-gray-300">
                    {SITE.role}
                </p>

                <div className="mx-auto max-w-lg">
                    <p className="leading-relaxed text-gray-500 dark:text-gray-400">
                        Building digital experiences with{" "}
                        <span className="font-medium text-purple-600 dark:text-purple-400">
                            Next.js
                        </span>
                        ,{" "}
                        <span className="font-medium text-blue-500 dark:text-blue-400">
                            React Native
                        </span>
                        , and modern web technologies.
                    </p>
                </div>

                <div className="mt-8 flex justify-center">
                    <Link
                        href="/portfolio"
                        className="inline-block rounded-lg bg-linear-to-r from-purple-600 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                    >
                        View My Work
                    </Link>
                </div>
            </Enter>
        </section>
    );
}
