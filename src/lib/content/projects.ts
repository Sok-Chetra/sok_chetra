import type { StaticImageData } from "next/image";

import angDuongImage from "../../../public/image/projects/ang-duong-hospital.webp";
import briquetImage from "../../../public/image/projects/briquet.webp";
import ccfkhImage from "../../../public/image/projects/ccfkh.webp";
import priviliClubImage from "../../../public/image/projects/privili-club.webp";

export type ProjectLinkKind = "website" | "app-store" | "play-store";

export type ProjectLink = {
    kind: ProjectLinkKind;
    href: string;
    /**
     * Only needed to tell two listings of the same kind apart — CCFKH ships a
     * companion app alongside the main one, and both are on Google Play.
     */
    label?: string;
};

export type Project = {
    id: number;
    /** URL segment for the detail page at /portfolio/<slug>. */
    slug: string;
    title: string;
    image: StaticImageData;
    tags: string[];
    /**
     * Every place the project can be reached. The first entry is the primary
     * one: it is where clicking the card goes, so it is the public site
     * wherever there is one and the store listing otherwise.
     */
    links?: ProjectLink[];
    /**
     * The detail page's <title>, before the site name is appended. Written per
     * project rather than assembled from tags, because this is the line people
     * actually search — "CCFKH app", not "CCFKH Laravel Bootstrap".
     */
    metaTitle: string;
    /** One sentence. Doubles as the detail page's meta description. */
    summary: string;
    /** Body copy for the detail page, one string per paragraph. */
    overview: string[];
    /** What the product does, taken from the live site or store listing. */
    highlights: string[];
};

export const PROJECTS: Project[] = [
    {
        id: 1,
        slug: "ccfkh",
        title: "CCFKH",
        image: ccfkhImage,
        // Web stack read off the live site: Laravel session and CSRF cookies,
        // a csrf-token meta tag, Bootstrap and jQuery, PHP 8 behind Cloudflare.
        // Flutter for the apps is confirmed by the site owner, who built them.
        tags: ["Laravel", "PHP", "Bootstrap", "Flutter", "iOS", "Android"],
        metaTitle: "CCFKH Hospital Website & Mobile App",
        summary:
            "Website and companion mobile apps for Cambodia-China Friendship Preah Kossamak Hospital in Phnom Penh, with online appointment booking.",
        overview: [
            "CCFKH is the Cambodia-China Friendship Preah Kossamak Hospital, a public hospital in Phnom Penh. The project covers its public website alongside companion apps on iOS and Android.",
            "The website presents the hospital's departments and services, opening hours and contact details in Khmer, English and Chinese, and lets patients request an appointment online rather than by phone.",
            "A second app, CCFKH Transportation, handles patient transport separately from the main patient app.",
        ],
        highlights: [
            "Online appointment requests, with the booking also available in the app",
            "Department and service directory covering the hospital's specialities",
            "Khmer, English and Chinese language switching",
            "Appointment detail screens carrying patient name, contact, age and insurance",
            "Published on both the App Store and Google Play",
        ],
        links: [
            { kind: "website", href: "https://www.ccfkh.com/" },
            {
                kind: "app-store",
                href: "https://apps.apple.com/kh/app/ccfkh/id6470182322",
            },
            {
                kind: "play-store",
                href: "https://play.google.com/store/apps/details?id=jp.nulo.ccfkhappnew",
            },
            {
                kind: "play-store",
                href: "https://play.google.com/store/apps/details?id=jp.nulo.tranpatientapp",
                label: "Transportation",
            },
        ],
    },
    {
        id: 2,
        slug: "ang-duong-hospital",
        title: "Ang Duong Hospital",
        image: angDuongImage,
        tags: ["Flutter", "Android", "Appointment Booking", "In-App Chat", "Patient Profiles"],
        metaTitle: "Ang Duong Hospital App — Flutter for Android",
        summary:
            "Android app for Ang Duong Hospital that lets patients book consultations, message the hospital and keep their appointment history in one place.",
        overview: [
            "A Flutter app for Ang Duong Hospital, built so patients can arrange care from their phone instead of queueing at the hospital.",
            "Booking runs the whole way through the app: pick a service, choose a practitioner or the next free slot, and the appointment appears in a list with its status. Appointments can be made on someone else's behalf, which matters where one family member arranges care for the rest.",
            "A messaging screen connects patients to the hospital directly, and appointment details carry the patient record the hospital needs on arrival.",
        ],
        highlights: [
            "Book by practitioner or next available slot",
            "Book on behalf of someone else",
            "Reminders and cancellations",
            "In-app messaging with the hospital",
            "Appointment detail with patient name, contact, age and insurance",
        ],
        links: [
            {
                kind: "play-store",
                href: "https://play.google.com/store/apps/details?id=jp.nulo.ong_duong_hospital",
            },
        ],
    },
    {
        id: 3,
        slug: "briquet",
        title: "Briquet App",
        image: briquetImage,
        tags: ["Flutter", "iOS", "Android", "Mobile Order", "Loyalty Card", "Store Locator"],
        metaTitle: "Briquet — Flutter Cafe App for iOS & Android",
        summary:
            "iOS and Android app for Briquet, a Japanese cafe chain — digital membership card, mobile ordering and a store locator.",
        overview: [
            "Briquet is a Japanese cafe chain. The app carries the parts of a visit that used to need paper or a counter queue: the membership card, the order, and finding the nearest branch.",
            "Membership is a scannable barcode backed by a points balance and a rank, so staff can read it straight from the screen. Regulars collect stamps and a daily login bonus on top.",
            "Mobile ordering lets customers pick a branch and order ahead, and a map view finds branches with filters for what each one offers.",
        ],
        highlights: [
            "Digital membership card with scannable barcode, points and rank",
            "Mobile ordering with branch selection",
            "Map-based store locator with filtering",
            "Branch pages with opening hours, facilities and reviews",
            "Daily login bonus and collectable stamps",
        ],
        links: [
            {
                kind: "app-store",
                href: "https://apps.apple.com/kh/app/briquet/id1643472892",
            },
            {
                kind: "play-store",
                href: "https://play.google.com/store/apps/details?id=jp.nulo.briquetapp",
            },
        ],
    },
    {
        id: 4,
        slug: "privili-club",
        title: "Privili Club",
        image: priviliClubImage,
        tags: ["WordPress", "WooCommerce", "Polylang"],
        metaTitle: "Privili Club — WooCommerce Storefront",
        summary:
            "Multilingual WooCommerce storefront for Privili Club, selling courses and member products to a Traditional Chinese audience.",
        overview: [
            "Privili Club is a WooCommerce storefront built on WordPress, carrying the Privili brand after its move to a new domain.",
            "The catalogue mixes digital and physical products across several vendors, with new, best-selling and most-popular views on the storefront and a member area for order history.",
            "Polylang handles the multilingual setup, with the storefront running in Traditional Chinese.",
        ],
        highlights: [
            "WooCommerce catalogue spanning multiple stores and vendors",
            "New, best-selling and most-popular product views",
            "Member accounts with order history and wishlist",
            "Multilingual via Polylang, running in Traditional Chinese",
        ],
        links: [{ kind: "website", href: "https://priviliclub.com/" }],
    },
];
