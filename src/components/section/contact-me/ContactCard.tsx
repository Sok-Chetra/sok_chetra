import type { IconType } from "react-icons";
import { FaLinkedin, FaPhone, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

import type { ContactChannel, ContactIcon } from "@/lib/content/contact";

/** Maps the content layer's icon key to a component, keeping content JSX-free. */
const ICONS: Record<ContactIcon, IconType> = {
    linkedin: FaLinkedin,
    telegram: FaTelegramPlane,
    whatsapp: FaWhatsapp,
    phone: FaPhone,
};

/**
 * Not animated. The first card sits ~730px down a 844px phone screen, inside
 * the first view, so any hydration-gated reveal left it blank and any
 * first-paint animation put four shadowed layers into the load's busiest
 * moment. Rendering it plainly avoids both.
 */
export default function ContactCard({ channel }: { channel: ContactChannel }) {
    const Icon = ICONS[channel.icon];

    return (
        <li className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800">
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
        </li>
    );
}
