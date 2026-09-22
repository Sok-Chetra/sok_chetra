import type { CSSProperties, ReactNode } from "react";

/**
 * Mount entrance animation — the CSS counterpart to {@link Reveal}.
 *
 * Use this for content on screen at first paint. `Reveal` is a client
 * component because Framer Motion is, so its animation cannot begin until
 * React has hydrated; for content already in view that left copy visibly
 * mis-placed for 1.6-2.0s on a throttled phone.
 *
 * Two things learned the hard way, both recorded in globals.css:
 *
 * - The jank on a real handset came from `transition-all` on page-sized
 *   sections, not from the number of animating elements. Staggering blocks is
 *   fine; a transition that watches layout properties on a full-width section
 *   is not.
 * - Nothing here fades. Chrome will not count an element that animates its
 *   opacity as a Largest Contentful Paint candidate until the animation ends,
 *   and the interior pages' LCP element is hero copy — 328ms sliding against
 *   944ms with a fade.
 *
 * `Reveal` remains right for scroll-triggered sections further down: the
 * visitor has to scroll to reach them, by which time the main thread is idle.
 */
type EnterTag = "div" | "section" | "h1" | "h2" | "p" | "ul" | "li";

type EnterAnimation =
    /** Slide up. The default, and what every interior hero uses. */
    | "rise"
    | "from-left"
    | "from-right"
    /** The hero divider drawing itself out from the centre. */
    | "line";

type EnterProps = {
    children?: ReactNode;
    /** Element to render. Defaults to a plain div. */
    as?: EnterTag;
    animation?: EnterAnimation;
    /** Stagger position, so sibling blocks arrive one after another. */
    step?: 1 | 2 | 3 | 4;
    /** Explicit delay, for lists whose length is not known up front. */
    delayMs?: number;
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
    delayMs,
    className,
    ...rest
}: EnterProps) {
    const classes = [`enter-${animation}`, step && `enter-d${step}`, className]
        .filter(Boolean)
        .join(" ");

    // The reduced-motion block in globals.css sets `animation-delay` with
    // `!important`, which outranks this inline custom property.
    const style =
        delayMs === undefined
            ? undefined
            : ({ "--enter-delay": `${delayMs}ms` } as CSSProperties);

    return (
        <Tag className={classes} style={style} {...rest}>
            {children}
        </Tag>
    );
}
