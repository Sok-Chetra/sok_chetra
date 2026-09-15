import type { MetadataRoute } from "next";

import { NAV_ITEMS } from "@/lib/content/navigation";
import { SITE } from "@/lib/content/site";

/** Generated from the nav, so a new page is listed the moment it is routable. */
export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return NAV_ITEMS.map((item) => ({
        url: item.path === "/" ? SITE.url : `${SITE.url}${item.path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: item.path === "/" ? 1 : 0.8,
    }));
}
