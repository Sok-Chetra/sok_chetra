/**
 * Single source of truth for site-wide identity, used by SEO metadata,
 * structured data, and any component that needs to name the site or its owner.
 */
export const SITE = {
    name: "Sok Chetra",
    role: "Full Stack Developer",
    url: "https://sokchetra.com",
    locale: "en_US",
    twitterHandle: "@Traa0000",
    cvPath: "/sok-chetra-cv.pdf",
    /**
     * Shown under the hero headline. Naming the city and country in visible
     * copy is what actually carries weight for "developer in Cambodia" style
     * searches — Google ranks on rendered content, and has ignored the
     * keywords meta tag since 2009.
     */
    tagline:
        "Web and mobile developer based in Phnom Penh, Cambodia — available for freelance and full-time work.",
    description:
        "Sok Chetra is a Full Stack Web and Mobile Developer based in Phnom Penh, Cambodia, building web and mobile products with Next.js, React Native, and modern web technologies.",

    /** Used by Person structured data and the location-aware copy. */
    location: {
        city: "Phnom Penh",
        region: "Phnom Penh",
        country: "Cambodia",
        /** ISO 3166-1 alpha-2, which is the form schema.org expects. */
        countryCode: "KH",
    },
    /**
     * Reused as the base keyword set every page extends.
     *
     * Google ignores `<meta name="keywords">` outright, so this changes no
     * ranking on its own — the phrases matter because they are mirrored in the
     * titles, descriptions and visible copy, which Google does read. Kept
     * because a few smaller engines still consult it and it costs nothing.
     */
    keywords: [
        "Sok Chetra",
        "Full Stack Developer",
        "Next.js Developer",
        "React Native Developer",
        "Software Developer Cambodia",
        "Web Developer Cambodia",
        "Mobile Developer Cambodia",
        "Full Stack Developer Cambodia",
        "Web Developer Phnom Penh",
        "Mobile App Developer Phnom Penh",
        "Freelance Developer Cambodia",
        "Hire Web Developer Cambodia",
        "Software Engineer",
        "TypeScript Developer",
    ],
} as const;
