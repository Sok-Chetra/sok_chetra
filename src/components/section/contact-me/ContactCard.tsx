import type { IconType } from "react-icons";
import { FaLinkedin, FaPhone, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

import Enter from "@/components/ui/Enter";
import type { ContactChannel, ContactIcon } from "@/lib/content/contact";

/** Maps the content layer's icon key to a component, keeping content JSX-free. */
const ICONS: Record<ContactIcon, IconType> = {
    linkedin: FaLinkedin,
    telegram: FaTelegramPlane,
    whatsapp: FaWhatsapp,
    phone: FaPhone,
};

/**
 * Enters block by block. The first card sits ~730px down a 844px phone screen,
 * inside the first view, so this must be a CSS entrance rather than a
 * hydration-gated reveal, which left it blank until React caught up.
 */
export default function ContactCard({
    channel,
    index = 0,
}: {
    channel: ContactChannel;
    index?: number;
}) {
    const Icon = ICONS[channel.icon];

    return (
        <Enter
            as="li"
            delayMs={90 + index * 90}
            className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800"
        >
            <div className="p-6">
                <div className="mb-4 flex items-center justify-center">
                    <span className="rounded-full bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200">
                        <Icon size={24} aria-hidden />
                    </span>
                </div>

                <h3 className="mb-1 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    {channel.title}
                </h3>

                <div className="text-center">
                    <a
                        href={channel.href}
                        // tel: links must open in place; web profiles open in a new tab.
                        {...(channel.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        className="rounded text-lg break-words text-indigo-600 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-400"
                    >
                        {channel.label}
                        {channel.external && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                </div>
            </div>
        </Enter>
    );
}
