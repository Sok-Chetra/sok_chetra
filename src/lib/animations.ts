import type { Variants } from "framer-motion";

/**
 * Shared motion presets for scroll-revealed sections.
 *
 * These are all below-the-fold: the visitor has to scroll to reach them, so
 * hydration is long finished by the time they trigger, and fading in costs
 * nothing. Above-the-fold entrances are CSS instead — Framer Motion cannot
 * start until React hydrates, which left hero copy visibly mis-placed for
 * 1.6-2.0s on a throttled phone. See @/components/ui/Enter and the `enter-*`
 * block in globals.css.
 *
 * Note for anything that may become the Largest Contentful Paint: an element
 * at `opacity: 0` is not eligible to be the LCP, and Framer Motion writes the
 * `hidden` variant into the SSR HTML. Animate such elements by transform only.
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

/** Parent that reveals its children one after another. */
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { when: "beforeChildren", staggerChildren: 0.08, delayChildren: 0.2 },
    },
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
