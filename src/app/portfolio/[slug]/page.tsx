import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { IconType } from "react-icons";
import { FaApple, FaGlobe, FaGooglePlay } from "react-icons/fa";

import JsonLd from "@/components/seo/JsonLd";
import Enter from "@/components/ui/Enter";
import { PROJECTS, type ProjectLinkKind } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildProjectSchema } from "@/lib/seo/structured-data";

const LINK_KINDS: Record<ProjectLinkKind, { name: string; Icon: IconType }> = {
    website: { name: "Website", Icon: FaGlobe },
    "app-store": { name: "App Store", Icon: FaApple },
    "play-store": { name: "Google Play", Icon: FaGooglePlay },
};

/**
 * Prerenders every project at build time, and `dynamicParams = false` makes an
 * unknown slug a 404 rather than an on-demand render of nothing.
 */
export function generateStaticParams() {
    return PROJECTS.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

function findProject(slug: string) {
    return PROJECTS.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = findProject(slug);

    if (!project) return buildMetadata({ title: "Project not found", description: "" });

    return buildMetadata({
        title: project.metaTitle,
        description: project.summary,
        path: `/portfolio/${project.slug}`,
        keywords: [project.title, ...project.tags, `${project.title} app`],
        image: project.image.src,
        imageAlt: `${project.title} project preview`,
        ogType: "article",
    });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = findProject(slug);

    if (!project) notFound();

    // Neighbours for the footer links, so every project page passes authority
    // on to another rather than dead-ending at the grid.
    const index = PROJECTS.findIndex((entry) => entry.slug === project.slug);
    const others = [...PROJECTS.slice(index + 1), ...PROJECTS.slice(0, index)].slice(0, 2);

    return (
        <main className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <JsonLd schema={buildProjectSchema(project)} />
            <JsonLd schema={buildBreadcrumbSchema(project)} />

            <article className="mx-auto max-w-4xl px-4 pt-32 pb-20 sm:px-6 md:pt-40 lg:px-8">
                <nav aria-label="Breadcrumb" className="mb-8">
                    <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>
                            <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
                                Home
                            </Link>
                        </li>
                        <li aria-hidden>/</li>
                        <li>
                            <Link
                                href="/portfolio"
                                className="hover:text-indigo-600 dark:hover:text-indigo-400"
                            >
                                Portfolio
                            </Link>
                        </li>
                        <li aria-hidden>/</li>
                        <li aria-current="page" className="font-medium text-gray-900 dark:text-white">
                            {project.title}
                        </li>
                    </ol>
                </nav>

                <Enter
                    as="h1"
                    className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white"
                >
                    {project.title}
                </Enter>

                <Enter as="p" step={1} className="mb-6 text-xl text-gray-600 dark:text-gray-300">
                    {project.summary}
                </Enter>

                <Enter step={2} className="mb-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-gray-700 dark:text-gray-100"
                        >
                            {tag}
                        </span>
                    ))}
                </Enter>

                {/*
                  `lift`, not `rise`: this image is the largest thing in the
                  opening view and so the likely LCP element, and an element
                  animating opacity is not an LCP candidate until the animation
                  ends. See the enter-* block in globals.css.
                */}
                <Enter animation="lift" step={3} className="mb-10">
                    <Image
                        src={project.image}
                        alt={`${project.title} project preview`}
                        className="w-full rounded-2xl shadow-lg"
                        sizes="(min-width: 896px) 896px, 100vw"
                        placeholder="blur"
                        priority
                    />
                </Enter>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                        About this project
                    </h2>
                    <div className="space-y-4 text-lg text-gray-700 dark:text-gray-300">
                        {project.overview.map((paragraph) => (
                            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                        ))}
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                        What it does
                    </h2>
                    <ul className="space-y-3">
                        {project.highlights.map((highlight) => (
                            <li
                                key={highlight}
                                className="flex gap-3 text-lg text-gray-700 dark:text-gray-300"
                            >
                                <span aria-hidden className="mt-1 text-indigo-600 dark:text-indigo-400">
                                    ✓
                                </span>
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {project.links && project.links.length > 0 && (
                    <section className="mb-12">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                            See it live
                        </h2>
                        <ul className="flex flex-wrap gap-3">
                            {project.links.map((link) => {
                                const { name, Icon } = LINK_KINDS[link.kind];
                                const text = link.label ?? name;
                                return (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${project.title} — ${text}${
                                                link.label ? ` on ${name}` : ""
                                            } (opens in a new tab)`}
                                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-300"
                                        >
                                            <Icon size={16} aria-hidden />
                                            {text}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}

                <section className="border-t border-gray-200 pt-8 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        More projects
                    </h2>
                    <ul className="flex flex-wrap gap-4">
                        {others.map((other) => (
                            <li key={other.slug}>
                                <Link
                                    href={`/portfolio/${other.slug}`}
                                    className="text-lg font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                                >
                                    {other.title} →
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/portfolio"
                                className="text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                            >
                                All projects
                            </Link>
                        </li>
                    </ul>
                </section>
            </article>
        </main>
    );
}
