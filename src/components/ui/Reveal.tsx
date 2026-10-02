"use client";

import { m, type TargetAndTransition, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { fadeInUp, VIEWPORT_ONCE, VIEWPORT_PARTIAL } from "@/lib/animations";

/**
 * Scroll- or mount-triggered reveal wrapper.
 *
 * Sections used to each be `"use client"` purely to animate, which shipped all
 * their static copy to the browser as JavaScript. Wrapping just the animated
 * boundary in this component lets the surrounding section stay a server
 * component, so the content itself ships as plain HTML.
 */
const MOTION_TAGS = {
    div: m.div,
    section: m.section,
    article: m.article,
    ul: m.ul,
    li: m.li,
    p: m.p,
    h1: m.h1,
    h2: m.h2,
} as const;

export type RevealTag = keyof typeof MOTION_TAGS;

type RevealProps = {
    /** Optional: a Reveal can be a purely decorative element such as a rule. */
    children?: ReactNode;
    /** Element to render. Defaults to a plain div. */
    as?: RevealTag;
    className?: string;
    variants?: Variants;
    /**
     * "scroll" reveals when scrolled into view; "mount" plays immediately.
     * "inherit" sets no trigger of its own and follows the nearest animated
     * ancestor — how list items join a parent's stagger, and why a section can
     * pass its rows in as server-rendered children and still have them animate.
     */
    trigger?: "scroll" | "mount" | "inherit";
    /**
     * For "scroll": "once" waits until the element is 100px inside the view,
     * "partial" starts as soon as a fifth of it shows — for wide grids.
     */
    viewport?: "once" | "partial";
    /** Hover target, e.g. `{ scale: 1.05 }`. A plain object, so a server
     *  component can set it. */
    hover?: TargetAndTransition;
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
    viewport = "once",
    hover,
    delay = 0,
    ...rest
}: RevealProps) {
    const Tag = MOTION_TAGS[as];

    // "inherit" must set neither `initial` nor a target: either one would make
    // the element its own animation root and detach it from its parent's.
    const triggerProps =
        trigger === "inherit"
            ? {}
            : trigger === "mount"
              ? { initial: "hidden" as const, animate: "visible" as const }
              : {
                    initial: "hidden" as const,
                    whileInView: "visible" as const,
                    viewport: viewport === "partial" ? VIEWPORT_PARTIAL : VIEWPORT_ONCE,
                };

    return (
        <Tag
            variants={variants}
            transition={delay ? { delay } : undefined}
            whileHover={hover}
            className={className}
            {...triggerProps}
            {...rest}
        >
            {children}
        </Tag>
    );
}
