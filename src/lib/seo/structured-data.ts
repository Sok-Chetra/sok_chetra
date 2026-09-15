import { CONTACT_CHANNELS } from "@/lib/content/contact";
import { SITE } from "@/lib/content/site";
import { SKILLS } from "@/lib/content/skills";

/**
 * JSON-LD graph describing the site owner and the site itself. Search engines
 * use this for rich results and knowledge-panel style entries — a portfolio is
 * exactly the case Person schema exists for.
 */
export function buildPersonSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: SITE.name,
        url: SITE.url,
        jobTitle: SITE.role,
        description: SITE.description,
        image: `${SITE.url}/image/my-profile.webp`,
        knowsAbout: [...SKILLS],
        sameAs: CONTACT_CHANNELS.filter((channel) => channel.external).map(
            (channel) => channel.href
        ),
    };
}

export function buildWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `${SITE.name} Portfolio`,
        url: SITE.url,
        description: SITE.description,
        author: { "@type": "Person", name: SITE.name, url: SITE.url },
    };
}
