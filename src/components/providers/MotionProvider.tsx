"use client";

import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Root motion setup.
 *
 * `LazyMotion` with the `domAnimation` feature set replaces the full `motion`
 * component, which bundles every feature whether or not the app uses it. The
 * heaviest of those are drag and layout projection, and this site uses
 * neither. `domAnimation` still provides animations, variants, exit animations
 * (AnimatePresence) and the hover/tap/focus/inView gestures — which is
 * everything here does use, `whileInView` included.
 *
 * `strict` makes any remaining `motion.*` throw instead of silently pulling the
 * full bundle back in and undoing the saving. Components must import `m`.
 *
 * `reducedMotion="user"` disables transform/opacity animation for visitors
 * whose OS requests reduced motion, applied once here so no individual
 * component has to remember to check.
 *
 * Children stay server components — they are passed through as props.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
    return (
        <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </LazyMotion>
    );
}
