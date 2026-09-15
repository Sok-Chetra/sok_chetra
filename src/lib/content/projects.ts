import type { StaticImageData } from "next/image";

import goodfoodImage from "../../../public/image/projects/goodfood.png";
import homekongImage from "../../../public/image/projects/homekong.png";
import priviliAppImage from "../../../public/image/projects/privili-app.png";
import priviliWebImage from "../../../public/image/projects/privili-web.png";

export type Project = {
    id: number;
    title: string;
    image: StaticImageData;
    tags: string[];
    /** Omitted when the project has no public URL to link to. */
    link?: string;
    /** Omitted when there is no blurb to show under the title. */
    description?: string;
};

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Homekong",
        image: homekongImage,
        tags: ["Next.js", "Tailwind CSS", "Node.js", "Docker"],
    },
    {
        id: 2,
        title: "GoodFood",
        image: goodfoodImage,
        tags: ["WordPress", "Woocommerce", "Polylang"],
    },
    {
        id: 3,
        title: "Privili Web",
        image: priviliWebImage,
        tags: ["WordPress", "Woocommerce", "Polylang"],
    },
    {
        id: 4,
        title: "Privili App",
        image: priviliAppImage,
        tags: ["React Native", "Woocommerce", "Polylang", "Node.js"],
    },
];
