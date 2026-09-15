"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Disables Framer Motion's transform/opacity animations for visitors whose OS
 * requests reduced motion. Applied once at the root so no individual component
 * has to remember to check.
 *
 * Children stay server components — they are passed through as props.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
