import Link from "next/link";

import PageHero from "@/components/section/PageHero";
import ButtonCV from "@/components/ui/ButtonCV";

export default function HeroSection() {
    return (
        <PageHero
            title={
                <>
                    My <span className="text-indigo-600 dark:text-indigo-400">Portfolio</span>
                </>
            }
            description="A curated collection of web and mobile projects I've built from Phnom Penh, Cambodia — for local clients and remote teams alike."
            actions={
                <>
                    <Link
                        href="/contact-me"
                        className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Contact Me
                    </Link>
                    <ButtonCV />
                </>
            }
        />
    );
}
