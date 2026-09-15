import { CONTACT_CHANNELS } from "@/lib/content/contact";
import { EDUCATION } from "@/lib/content/education";
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

        /**
         * Location signals. Without these the site says what this person does
         * but never where, which is the whole basis of a "developer in
         * Cambodia" style query. `address` is the field Google reads for
         * geography; `homeLocation` and `workLocation` reinforce it, and
         * `areaServed` states who the work is offered to.
         */
        address: {
            "@type": "PostalAddress",
            addressLocality: SITE.location.city,
            addressRegion: SITE.location.region,
            addressCountry: SITE.location.countryCode,
        },
        homeLocation: {
            "@type": "Place",
            name: `${SITE.location.city}, ${SITE.location.country}`,
        },
        workLocation: {
            "@type": "Place",
            name: `${SITE.location.city}, ${SITE.location.country}`,
        },
        nationality: { "@type": "Country", name: SITE.location.country },
        areaServed: [
            { "@type": "Country", name: SITE.location.country },
            { "@type": "Place", name: "Worldwide (remote)" },
        ],

        /** Corroborates the location — a real, verifiable institution. */
        alumniOf: EDUCATION.map((entry) => ({
            "@type": "EducationalOrganization",
            name: entry.institution,
        })),

        knowsLanguage: [
            { "@type": "Language", name: "Khmer" },
            { "@type": "Language", name: "English" },
        ],

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
