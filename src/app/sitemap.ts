import type { MetadataRoute } from "next";

import { NAV_ITEMS } from "@/lib/content/navigation";
import { PROJECTS } from "@/lib/content/projects";
import { SITE } from "@/lib/content/site";

/**
 * Generated from the nav plus the project set, so a new page is listed the
 * moment it is routable and a new project the moment it has a slug.
 *
 * Deliberately no `lastModified`. It used to be `new Date()`, which stamped
 * every URL with the build time, so each deploy claimed every page had just
 * changed. Google only trusts `lastmod` when it is "consistently and verifiably
 * accurate" and otherwise ignores it for the whole site; leaving it out is
 * honest, and an eight-page site is crawled in full anyway.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const pages = NAV_ITEMS.map((item) => ({
        url: item.path === "/" ? SITE.url : `${SITE.url}${item.path}`,
        changeFrequency: "monthly" as const,
        priority: item.path === "/" ? 1 : 0.8,
    }));

    const projects = PROJECTS.map((project) => ({
        url: `${SITE.url}/portfolio/${project.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...pages, ...projects];
}
