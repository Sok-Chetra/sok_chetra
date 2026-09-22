import type { ReactNode } from "react";

/**
 * Mount entrance animation — the CSS counterpart to {@link Reveal}.
 *
 * Use this for anything above the fold on load. `Reveal` is a client component
 * because Framer Motion is, which means its animation cannot begin until React
 * has hydrated; for content that is already on screen that produced a long
 * window of visibly mis-placed text (see the `enter-*` block in globals.css).
 * This renders a plain element with a class, so it stays a server component and
 * the animation runs from first paint.
 *
 * `Reveal` remains the right tool for scroll-triggered sections: the visitor
 * has to scroll to reach them, by which time hydration is long finished.
 */
type EnterTag = "div" | "section" | "h1" | "h2" | "p";

/** Directions match the Framer variants these replaced, so motion is unchanged. */
type EnterAnimation = "rise" | "from-left" | "from-right" | "line";

type EnterProps = {
    children?: ReactNode;
    /** Element to render. Defaults to a plain div. */
    as?: EnterTag;
    animation?: EnterAnimation;
    /** Stagger position. Maps to a fixed delay step shared with siblings. */
    step?: 1 | 2 | 3 | 4;
    className?: string;
    id?: string;
    role?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
};

export default function Enter({
    children,
    as: Tag = "div",
    animation = "rise",
    step,
    className,
    ...rest
}: EnterProps) {
    const classes = [`enter-${animation}`, step && `enter-d${step}`, className]
        .filter(Boolean)
        .join(" ");

    return (
        <Tag className={classes} {...rest}>
            {children}
        </Tag>
    );
}
