import type { Metadata } from "next";

import { SITE } from "@/lib/content/site";

type OgType = "website" | "profile" | "article";

export type PageMetaInput = {
    /** Page title without the site suffix — the layout template appends it. */
    title: string;
    /**
     * Use `title` verbatim instead of letting the layout append "| Sok Chetra".
     * For a page that needs to rank on the person's name, leading with it beats
     * trailing it — but only if the suffix does not then repeat it.
     */
    titleAbsolute?: boolean;
    description: string;
    /** Route path, e.g. "/about-me". Defaults to the home page. */
    path?: string;
    /** Page-specific keywords, merged with the site-wide set. */
    keywords?: string[];
    /**
     * Open Graph image path relative to the site root. `null` when the route
     * generates its own with an `opengraph-image` file, which then supplies the
     * tags — and which X also falls back to when there is no `twitter:image`.
     */
    image?: string | null;
    imageAlt?: string;
    ogType?: OgType;
    /** Optional longer blurb for social cards; falls back to `description`. */
    ogDescription?: string;
    twitterDescription?: string;
};

const DEFAULT_OG_IMAGE = "/image/og-my-profile.jpg";

/** `og:image:type`, from the extension — previously anything not .jpg was "png". */
function imageType(path: string): string {
    if (/\.jpe?g$/i.test(path)) return "image/jpeg";
    if (/\.webp$/i.test(path)) return "image/webp";
    return "image/png";
}

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
    titleAbsolute = false,
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
    const useAbsolute = path === "/" || titleAbsolute;

    return {
        // Home uses `absolute` so the layout's "%s | Sok Chetra"
        // template does not append the name twice.
        title: useAbsolute ? { absolute: path === "/" ? fullTitle : title } : title,
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
            ...(image && {
                images: [
                    {
                        url: image,
                        width: 1200,
                        height: 630,
                        alt: imageAlt ?? `${SITE.name} — ${SITE.role}`,
                        type: imageType(image),
                    },
                ],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description: twitterDescription ?? description,
            creator: SITE.twitterHandle,
            ...(image && { images: [image] }),
        },
    };
}
