export type Job = {
    id: number;
    company: string;
    position: string;
    period: string;
    responsibilities: string[];
    technologies: string[];
};

export const EXPERIENCE: Job[] = [
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
