import Image from "next/image";
import Link from "next/link";

import profileImage from "../../../../public/image/my-profile.webp";

import Enter from "@/components/ui/Enter";
import ScrollCue from "@/components/ui/ScrollCue";
import { SITE } from "@/lib/content/site";

/**
 * Server component. Only the scroll cue is client side; the entrance
 * animation is CSS, so it runs from first paint instead of waiting for
 * hydration — see @/components/ui/Enter.
 */
export default function HeroSection() {
    return (
        <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-24 sm:px-6 md:min-h-screen md:py-0 lg:px-8">
            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
                <Enter animation="from-left" className="order-2 md:order-1">
                    <h1 className="mb-4 text-center text-4xl font-bold sm:text-5xl md:text-start lg:text-6xl dark:text-white">
                        {SITE.name} —{" "}
                        <span className="text-blue-600 dark:text-blue-400">Full Stack</span> Developer
                    </h1>

                    <p className="mb-8 text-center text-lg text-gray-600 sm:text-xl md:text-start dark:text-gray-300">
                        {SITE.tagline}
                    </p>

                    <div className="flex justify-center md:block">
                        <Link
                            href="/portfolio"
                            className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-transform duration-300 hover:scale-105 hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-95 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                            View Portfolio
                        </Link>
                    </div>
                </Enter>

                <Enter animation="from-right" className="order-1 flex justify-center md:order-2">
                    <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-md sm:h-80 sm:w-80 dark:border-gray-800 dark:shadow-gray-800/20">
                        {/*
                          One source, not two. The previous markup rendered a
                          desktop and a mobile <Image> and hid one with CSS —
                          which hides it visually but still downloads it. Next's
                          optimizer now produces the small variant itself.
                        */}
                        <Image
                            src={profileImage}
                            alt={`${SITE.name}, ${SITE.role}`}
                            fill
                            sizes="(min-width: 640px) 320px, 256px"
                            className="object-cover"
                            // Statically imported, so Next generates a blur
                            // placeholder and knows the intrinsic size — no
                            // layout shift while the real image decodes.
                            placeholder="blur"
                            priority
                            fetchPriority="high"
                        />
                    </div>
                </Enter>
            </div>

            <ScrollCue targetId="projects" />
        </section>
    );
}
