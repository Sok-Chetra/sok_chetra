import type { ReactNode } from "react";

/**
 * Mount entrance animation — the CSS counterpart to {@link Reveal}.
 *
 * Use this for content that is on screen at first paint. `Reveal` is a client
 * component because Framer Motion is, so its animation cannot begin until
 * React has hydrated; for content already in view that left copy visibly
 * mis-placed for 1.6-2.0s on a throttled phone.
 *
 * Keep the count low. Every animating element needs its own compositor layer,
 * rasterised while the page is still parsing JavaScript, hydrating and
 * decoding images. Animating a hero's children individually janked on a real
 * handset; animating the hero as one block does not. Anything heavy — cards
 * carrying shadows or images — is better left unanimated.
 *
 * `Reveal` remains right for scroll-triggered sections further down: the
 * visitor has to scroll to reach them, by which time the main thread is idle.
 */
type EnterAnimation = "rise" | "from-left" | "from-right";

type EnterProps = {
    children?: ReactNode;
    /** Directions match the Framer variants these replaced, so motion is unchanged. */
    animation?: EnterAnimation;
    className?: string;
    id?: string;
    role?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
};

export default function Enter({
    children,
    animation = "rise",
    className,
    ...rest
}: EnterProps) {
    const classes = [`enter-${animation}`, className].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
}
