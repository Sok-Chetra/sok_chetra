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
    tagline: "Available for freelance & work — let's build something amazing.",
    description:
        "Portfolio of Sok Chetra, a Full Stack Developer building web and mobile products with Next.js, React Native, and modern web technologies.",
    /** Reused as the base keyword set every page extends. */
    keywords: [
        "Sok Chetra",
        "Full Stack Developer",
        "Next.js Developer",
        "React Native Developer",
        "Web Developer Cambodia",
        "Software Engineer",
        "TypeScript Developer",
    ],
} as const;
