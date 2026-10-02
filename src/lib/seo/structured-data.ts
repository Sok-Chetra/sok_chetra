import { CONTACT_CHANNELS, PHONE_NUMBER } from "@/lib/content/contact";
import type { Project } from "@/lib/content/projects";
import { EDUCATION } from "@/lib/content/education";
import { EXPERIENCE } from "@/lib/content/experience";
import { SITE } from "@/lib/content/site";
import { SKILLS } from "@/lib/content/skills";

/**
 * JSON-LD graph describing the site owner and the site itself. Search engines
 * use this for rich results and knowledge-panel style entries — a portfolio is
 * exactly the case Person schema exists for.
 */
export function buildPersonSchema() {
    /**
     * Named employers corroborate the person the way `alumniOf` corroborates
     * the location: a real company with its own domain, which Google already
     * knows about, vouching for an otherwise unknown one.
     */
    const employers = EXPERIENCE.filter((job) => job.current).map((job) => ({
        "@type": "Organization",
        name: job.company,
        ...(job.companyUrl ? { url: job.companyUrl } : {}),
        ...(job.companyProfiles?.length ? { sameAs: job.companyProfiles } : {}),
    }));

    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: SITE.name,
        /**
         * Split out as well as given whole. Khmer names put the family name
         * first, so "Sok Chetra" is family name Sok, given name Chetra — the
         * reverse of what a western-trained parser assumes. Stating both
         * removes the guess, and is what lets Google treat "Chetra" and "Sok
         * Chetra" as the same person rather than two.
         */
        givenName: "Chetra",
        familyName: "Sok",
        alternateName: ["Chetra Sok", "Chetra"],
        url: SITE.url,
        jobTitle: SITE.role,
        description: SITE.description,
        image: `${SITE.url}/image/my-profile.webp`,
        knowsAbout: [...SKILLS],

        /**
         * The P of the name/address/phone triple the `address` block below
         * starts. Local ranking leans on those three matching character for
         * character everywhere they appear, so this reuses the same constant
         * the contact page renders rather than restating the number.
         */
        telephone: PHONE_NUMBER,

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

        ...(employers.length ? { worksFor: employers } : {}),

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

/**
 * Describes one project. Apps use SoftwareApplication, which carries the
 * platform and store URL; the web-only projects use CreativeWork.
 *
 * No rating or price is claimed. Both are optional in schema.org and inventing
 * them to chase a rich result would be a fabrication about someone's product.
 */
export function buildProjectSchema(project: Project) {
    const storeLinks = (project.links ?? []).filter((link) => link.kind !== "website");
    const website = (project.links ?? []).find((link) => link.kind === "website");
    const platforms = storeLinks.map((link) => (link.kind === "app-store" ? "iOS" : "Android"));

    const base = {
        "@context": "https://schema.org",
        name: project.title,
        description: project.summary,
        url: `${SITE.url}/portfolio/${project.slug}`,
        image: `${SITE.url}${project.image.src}`,
        keywords: project.tags.join(", "),
        author: { "@type": "Person", name: SITE.name, url: SITE.url },
    };

    if (platforms.length) {
        return {
            ...base,
            "@type": "SoftwareApplication",
            applicationCategory: "MobileApplication",
            operatingSystem: [...new Set(platforms)].join(", "),
            ...(storeLinks[0] ? { installUrl: storeLinks[0].href } : {}),
            ...(website ? { sameAs: website.href } : {}),
        };
    }

    return {
        ...base,
        "@type": "CreativeWork",
        ...(website ? { sameAs: website.href } : {}),
    };
}

/** Breadcrumb trail for a project page, so search results show the hierarchy. */
export function buildBreadcrumbSchema(project: Project) {
    const crumbs = [
        { name: "Home", url: SITE.url },
        { name: "Portfolio", url: `${SITE.url}/portfolio` },
        { name: project.title, url: `${SITE.url}/portfolio/${project.slug}` },
    ];

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
        })),
    };
}
