export type Job = {
    id: number;
    company: string;
    /** Employer's site. Feeds `worksFor` in the Person schema. */
    companyUrl?: string;
    position: string;
    period: string;
    /** Marks the present role, which is the one `worksFor` describes. */
    current?: boolean;
    responsibilities: string[];
    technologies: string[];
};

/** Most recent first — the section renders this order as given. */

export const EXPERIENCE: Job[] = [
    {
        id: 2,
        company: "Nulo",
        companyUrl: "https://nulo.co.jp/",
        position: "Mobile App Developer",
        period: "Jan 2025 - Present",
        current: true,
        responsibilities: [
            "Built app interfaces to match the supplied UX/UI designs",
            "Refreshed existing projects and games with updated designs",
            "Developed new applications with Flutter",
            "Handled iOS release work in Xcode — distributing builds to TestFlight, renewing expiring TestFlight builds, and submitting apps for unlisted App Store distribution",
            "Worked closely with backend developers to integrate APIs",
            "Used Claude to assist development",
        ],
        technologies: [
            "Flutter",
            "Dart",
            "Xcode",
            "TestFlight",
            "iOS",
            "API Integration",
            "Claude",
        ],
    },
    {
        id: 1,
        company: "ZtoA Group",
        position: "Full Stack Developer",
        period: "Jan 2022 - June 2025",
        responsibilities: [
            "Developed web applications using WordPress, Next.js, and various frameworks including styling frameworks (Tailwind CSS) and component libraries (shadcn)",
            "Built mobile applications using React Native (Expo) with modern styling frameworks and component libraries",
            "Collaborated in team environments to design UI/UX and develop backend APIs to meet project requirements",
            "Implemented AI features including chatbot integrations in web and mobile applications",
            "Deployed and hosted websites using Cloudflare + Vercel with custom domain configuration",
            "Managed source code version control using Git with GitHub/Bitbucket",
        ],
        technologies: [
            "WordPress",
            "Next.js",
            "React Native",
            "Expo",
            "Tailwind CSS",
            "shadcn",
            "Node.js",
            "Git",
            "GitHub",
            "Bitbucket",
            "Cloudflare",
            "Vercel",
            "AI Integration",
        ],
    },
];
