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
    title: string;
    image: StaticImageData;
    tags: string[];
    /**
     * Every place the project can be reached. The first entry is the primary
     * one: it is where clicking the card goes, so it is the public site
     * wherever there is one and the store listing otherwise.
     */
    links?: ProjectLink[];
    /** Omitted when there is no blurb to show under the title. */
    description?: string;
};

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "CCFKH",
        image: ccfkhImage,
        // Web stack read off the live site: Laravel session and CSRF cookies,
        // a csrf-token meta tag, Bootstrap and jQuery, PHP 8 behind Cloudflare.
        // Flutter for the apps is confirmed by the site owner, who built them.
        tags: ["Laravel", "PHP", "Bootstrap", "Flutter", "iOS", "Android"],
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
        title: "Ang Duong Hospital",
        image: angDuongImage,
        tags: ["Flutter", "Android", "Appointment Booking", "In-App Chat", "Patient Profiles"],
        links: [
            {
                kind: "play-store",
                href: "https://play.google.com/store/apps/details?id=jp.nulo.ong_duong_hospital",
            },
        ],
    },
    {
        id: 3,
        title: "Briquet App",
        image: briquetImage,
        tags: ["Flutter", "iOS", "Android", "Mobile Order", "Loyalty Card", "Store Locator"],
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
        title: "Privili Club",
        image: priviliClubImage,
        tags: ["WordPress", "WooCommerce", "Polylang"],
        links: [{ kind: "website", href: "https://priviliclub.com/" }],
    },
];
