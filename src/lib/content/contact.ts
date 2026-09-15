/** Icon is referenced by key so this stays a pure-data module (no JSX). */
export type ContactIcon = "linkedin" | "telegram" | "whatsapp" | "phone";

export type ContactChannel = {
    id: string;
    title: string;
    /** Fully-qualified href, ready to use — no string munging in the view. */
    href: string;
    label: string;
    icon: ContactIcon;
    /** External links open in a new tab; tel: links must not. */
    external: boolean;
};

export const PHONE_NUMBER = "+855 89 450 486";

export const CONTACT_CHANNELS: ContactChannel[] = [
    {
        id: "linkedin",
        title: "LinkedIn",
        href: "https://www.linkedin.com/in/sok-chetra/",
        label: "Sok Chetra",
        icon: "linkedin",
        external: true,
    },
    {
        id: "telegram",
        title: "Telegram",
        href: "https://t.me/tra_6",
        label: "@tra_6",
        icon: "telegram",
        external: true,
    },
    {
        id: "whatsapp",
        title: "WhatsApp",
        href: "https://wa.me/85589450486",
        label: PHONE_NUMBER,
        icon: "whatsapp",
        external: true,
    },
    {
        id: "phone",
        title: "Phone",
        href: `tel:${PHONE_NUMBER.replace(/\s+/g, "")}`,
        label: PHONE_NUMBER,
        icon: "phone",
        external: false,
    },
];
