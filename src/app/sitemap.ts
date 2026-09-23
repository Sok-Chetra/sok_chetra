import type { MetadataRoute } from "next";

import { NAV_ITEMS } from "@/lib/content/navigation";
import { PROJECTS } from "@/lib/content/projects";
import { SITE } from "@/lib/content/site";

/**
 * Generated from the nav plus the project set, so a new page is listed the
 * moment it is routable and a new project the moment it has a slug.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const pages = NAV_ITEMS.map((item) => ({
        url: item.path === "/" ? SITE.url : `${SITE.url}${item.path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: item.path === "/" ? 1 : 0.8,
    }));

    const projects = PROJECTS.map((project) => ({
        url: `${SITE.url}/portfolio/${project.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...pages, ...projects];
}
