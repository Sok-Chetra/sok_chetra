export type Education = {
    id: number;
    degree: string;
    institution: string;
    status: string;
    /** Tailwind border colour class for the timeline rule. */
    accentClass: string;
    icon: string;
};

export const EDUCATION: Education[] = [
    {
        id: 1,
        degree: "Bachelor of Computer Science",
        institution: "Royal University of Phnom Penh (RUPP)",
        status: "Graduated",
        accentClass: "border-blue-500",
        icon: "🎓",
    },
    {
        id: 2,
        degree: "GEP 10",
        institution: "Australian Centre for Education (ACE)",
        status: "Present",
        accentClass: "border-green-500",
        icon: "📖",
    },
];
