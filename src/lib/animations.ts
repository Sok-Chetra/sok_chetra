import type { Variants } from "framer-motion";

/**
 * Shared motion presets. Sections previously each declared their own near
 * identical variants; keeping them here means timing stays consistent and one
 * edit re-tunes the whole site.
 *
 * Motion is disabled automatically for visitors who prefer reduced motion —
 * see the <MotionConfig reducedMotion="user"> wrapper in the root layout.
 */

/** Replay-once viewport trigger used by every scroll-reveal section. */
export const VIEWPORT_ONCE = { once: true, margin: "-100px" } as const;

/** Looser trigger for wide grids that should start before fully in view. */
export const VIEWPORT_PARTIAL = { once: true, amount: 0.2 } as const;

/** The workhorse: fade up into place. */
export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/** Fade in from the side — used by hero copy and imagery. */
export const fadeInFrom = (x: number): Variants => ({
    hidden: { opacity: 0, x },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
});

/**
 * Slide with no fade — for above-the-fold content, and required for whatever
 * turns out to be the LCP element.
 *
 * An element at `opacity: 0` is not eligible to be the Largest Contentful
 * Paint, and framer-motion writes the `hidden` variant into the SSR HTML. Using
 * `fadeInFrom` on the hero therefore left the image fully downloaded but
 * unpaintable until hydration finished the fade, measured on production as
 * 1037ms of LCP "render delay" — 43% of a 2.4s LCP. A transform does not stop
 * the element painting, so the content is genuinely visible straight away
 * rather than merely counted as visible.
 */
export const slideInFrom = (x: number): Variants => ({
    hidden: { x },
    visible: { x: 0, transition: { duration: 0.8 } },
});

/** Parent that reveals its children one after another. */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { when: "beforeChildren", staggerChildren: 0.08, delayChildren: 0.2 },
    },
};

/**
 * Orchestration-only container for content that is above the fold on load.
 *
 * `staggerContainer` sets `hidden: { opacity: 0 }`, and framer-motion writes
 * the hidden variant into the SSR HTML — which hides every descendant until
 * hydration finishes the fade. Measured on a throttled phone, that left the
 * interior pages blank for 1.4-1.8s while the markup sat there fully painted
 * and invisible. This variant carries no opacity at all, so the server-rendered
 * copy is readable from first paint and only moves afterwards.
 *
 * Below-the-fold reveals can keep fading: the visitor scrolls to them, so there
 * is no window where they stare at nothing.
 */
export const staggerContainerVisible: Variants = {
    hidden: {},
    visible: {
        transition: { when: "beforeChildren", staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

/** Child of {@link staggerContainerVisible} — slides without fading. */
export const slideUpItem: Variants = {
    hidden: { y: 24 },
    visible: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Child of {@link staggerContainer}. */
export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Springy card entrance for the contact grid. */
export const cardRise: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 1 } },
};

/** Scale-and-settle used by the technology tiles. */
export const popIn: Variants = {
    hidden: { scale: 0.8, opacity: 0, y: 10 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Divider rule that draws itself out from the centre. */
export const growLine: Variants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { delay: 0.8, duration: 0.8, type: "spring", stiffness: 100, damping: 10 },
    },
};
