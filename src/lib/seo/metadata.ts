import type { Metadata } from "next";

import { SITE } from "@/lib/content/site";

type OgType = "website" | "profile" | "article";

export type PageMetaInput = {
    /** Page title without the site suffix — the layout template appends it. */
    title: string;
    description: string;
    /** Route path, e.g. "/about-me". Defaults to the home page. */
    path?: string;
    /** Page-specific keywords, merged with the site-wide set. */
    keywords?: string[];
    /** Open Graph image path relative to the site root. */
    image?: string;
    imageAlt?: string;
    ogType?: OgType;
    /** Optional longer blurb for social cards; falls back to `description`. */
    ogDescription?: string;
    twitterDescription?: string;
};

const DEFAULT_OG_IMAGE = "/image/og-my-profile.jpg";

/**
 * Builds a complete Metadata object from the handful of fields that actually
 * differ per page. Open Graph, Twitter, canonical URL and keyword merging are
 * derived here so a page never restates them.
 *
 * `metadataBase` is set once in the root layout, which is what lets the image
 * and canonical paths below stay relative.
 */
export function buildMetadata({
    title,
    description,
    path = "/",
    keywords = [],
    image = DEFAULT_OG_IMAGE,
    imageAlt,
    ogType = "website",
    ogDescription,
    twitterDescription,
}: PageMetaInput): Metadata {
    const url = path === "/" ? SITE.url : `${SITE.url}${path}`;
    // The home page previously discarded its `title` and rebuilt one from
    // SITE.role, so there was no way to give the most important page in the
    // site its own headline. It now uses what the page passes, like every
    // other route.
    const fullTitle = path === "/" ? `${SITE.name} — ${title}` : `${title} | ${SITE.name}`;

    return {
        // Home uses `absolute` so the layout's "%s | Sok Chetra"
        // template does not append the name twice.
        title: path === "/" ? { absolute: fullTitle } : title,
        description,
        keywords: [...SITE.keywords, ...keywords],
        authors: [{ name: SITE.name }],
        creator: SITE.name,
        referrer: "origin-when-cross-origin",
        alternates: { canonical: path },
        openGraph: {
            title: fullTitle,
            description: ogDescription ?? description,
            url,
            siteName: `${SITE.name} Portfolio`,
            locale: SITE.locale,
            type: ogType,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: imageAlt ?? `${SITE.name} — ${SITE.role}`,
                    type: image.endsWith(".jpg") ? "image/jpeg" : "image/png",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description: twitterDescription ?? description,
            creator: SITE.twitterHandle,
            images: [image],
        },
    };
}
