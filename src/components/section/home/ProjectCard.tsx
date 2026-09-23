import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FaApple, FaArrowRight, FaGlobe, FaGooglePlay } from "react-icons/fa";

import type { Project, ProjectLinkKind } from "@/lib/content/projects";

type ProjectCardProps = {
    project: Project;
    /**
     * Set for the first card on /portfolio, where it sits in the opening view
     * and is the measured LCP element. next/image lazy-loads by default, which
     * delayed that fetch until after layout. Left off on the home page, where
     * this section is below the fold and the hero portrait is the LCP.
     */
    priority?: boolean;
};

/** Keeps the content layer JSX-free, the same way ContactCard maps its icons. */
const LINK_KINDS: Record<ProjectLinkKind, { name: string; Icon: IconType }> = {
    website: { name: "Website", Icon: FaGlobe },
    "app-store": { name: "App Store", Icon: FaApple },
    "play-store": { name: "Google Play", Icon: FaGooglePlay },
};

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
    // Hover lift is CSS. This was `m.div whileHover={{ y: -10 }}`, which made
    // every card a client component and shipped Framer Motion to hydrate a
    // hover effect the compositor does for free.
    return (
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-[transform,box-shadow] duration-300 hover:-translate-y-2.5 hover:shadow-xl dark:bg-gray-700 dark:hover:shadow-gray-900/50">
            {/* Image container with fixed aspect ratio */}
            <div className="relative h-48 w-full shrink-0">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    placeholder="blur"
                    priority={priority}
                />
            </div>

            {/* Content area that grows to fill remaining space */}
            <div className="flex grow flex-col p-6">
                <h3 className="mb-2 line-clamp-2 text-xl font-semibold dark:text-white">
                    {project.title}
                </h3>

                {/* Tags container with scroll if needed */}
                <div className="mb-4 flex max-h-20 flex-wrap gap-1 overflow-y-auto">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium whitespace-nowrap text-blue-800 dark:bg-gray-600 dark:text-gray-100"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                    {project.summary}
                </p>

                {/*
                  One button per destination, so a project that ships as a site
                  and two store listings stays a single card. The card itself is
                  deliberately not a link: these are the only hit targets, which
                  keeps each one unambiguous and avoids nesting links inside a
                  larger one.
                */}
                <ul className="mt-auto flex flex-wrap gap-2">
                    <li>
                        <Link
                            href={`/portfolio/${project.slug}`}
                            aria-label={`${project.title} — read more`}
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
                        >
                            Details
                            <FaArrowRight size={11} aria-hidden />
                        </Link>
                    </li>
                    {(project.links ?? []).map((link) => {
                        const { name, Icon } = LINK_KINDS[link.kind];
                        const text = link.label ?? name;
                        return (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    // Visible text is a substring of this,
                                    // so the spoken and seen labels agree.
                                    aria-label={`${project.title} — ${text}${
                                        link.label ? ` on ${name}` : ""
                                    } (opens in a new tab)`}
                                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-500 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:bg-gray-600 dark:hover:text-blue-300"
                                >
                                    <Icon size={14} aria-hidden />
                                    {text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
