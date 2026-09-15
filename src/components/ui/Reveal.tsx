"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { fadeInUp, VIEWPORT_ONCE } from "@/lib/animations";

/**
 * Scroll- or mount-triggered reveal wrapper.
 *
 * Sections used to each be `"use client"` purely to animate, which shipped all
 * their static copy to the browser as JavaScript. Wrapping just the animated
 * boundary in this component lets the surrounding section stay a server
 * component, so the content itself ships as plain HTML.
 */
const MOTION_TAGS = {
    div: motion.div,
    section: motion.section,
    article: motion.article,
    ul: motion.ul,
    li: motion.li,
    p: motion.p,
    h1: motion.h1,
    h2: motion.h2,
} as const;

export type RevealTag = keyof typeof MOTION_TAGS;

type RevealProps = {
    /** Optional: a Reveal can be a purely decorative element such as a rule. */
    children?: ReactNode;
    /** Element to render. Defaults to a plain div. */
    as?: RevealTag;
    className?: string;
    variants?: Variants;
    /** "scroll" reveals when scrolled into view; "mount" plays immediately. */
    trigger?: "scroll" | "mount";
    /** Seconds to wait before animating — used to stagger sibling reveals. */
    delay?: number;
    /**
     * Only landmark/labelling attributes are forwarded. Spreading all div props
     * collides with framer-motion, whose `onDrag` has a different signature to
     * React's.
     */
    id?: string;
    role?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
};

export default function Reveal({
    children,
    as = "div",
    className,
    variants = fadeInUp,
    trigger = "scroll",
    delay = 0,
    ...rest
}: RevealProps) {
    const Tag = MOTION_TAGS[as];

    const triggerProps =
        trigger === "mount"
            ? { animate: "visible" as const }
            : { whileInView: "visible" as const, viewport: VIEWPORT_ONCE };

    return (
        <Tag
            initial="hidden"
            variants={variants}
            transition={delay ? { delay } : undefined}
            className={className}
            {...triggerProps}
            {...rest}
        >
            {children}
        </Tag>
    );
}
