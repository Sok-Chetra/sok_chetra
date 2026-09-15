import Link from "next/link";

import PageHero from "@/components/section/PageHero";

export default function HeroSection() {
    return (
        <PageHero
            title={
                <>
                    Let&apos;s <span className="text-indigo-600 dark:text-indigo-400">Connect</span>
                </>
            }
            description="I'm a full stack web and mobile developer based in Phnom Penh, Cambodia, available for freelance projects, contract work, and full-time roles — locally or remote. Whether you have a project in mind or just want to say hello, I'd love to hear from you."
            actions={
                <Link
                    href="/about-me"
                    className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                    Who Am I?
                </Link>
            }
        />
    );
}
