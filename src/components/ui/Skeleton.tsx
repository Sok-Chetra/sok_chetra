import type { ReactNode } from "react";

type SkeletonProps = {
    /** Shape and size come from the caller, so one primitive covers bars,
     *  pills, blocks and avatars. */
    className?: string;
};

/**
 * A single placeholder bar.
 *
 * Tinted rather than coloured: `bg-gray-900/10` over whatever sits behind it,
 * instead of a fixed grey. A fixed grey has to be picked per surface — gray-200
 * reads on a white card but vanishes on the blue-50 page, and in dark mode
 * gray-700 is invisible on the gray-700 cards. Letting the caller override the
 * colour does not fix that either, because two Tailwind utilities of equal
 * specificity are resolved by stylesheet order, not by class-string order, so
 * the override silently loses about half the time. A translucent neutral needs
 * no per-surface decision at all.
 *
 * Hidden from the accessibility tree: a dozen empty divs tell a screen reader
 * nothing, and the announcement belongs to <SkeletonScreen> below, once per
 * route rather than once per bar.
 *
 * The pulse carries no reduced-motion guard of its own — the global block in
 * globals.css already collapses every animation's duration and iteration count,
 * which leaves this a flat block rather than a blinking one.
 */
export default function Skeleton({ className = "" }: SkeletonProps) {
    return (
        <div
            aria-hidden
            className={`animate-pulse rounded bg-gray-900/10 dark:bg-white/10 ${className}`}
        />
    );
}

/**
 * Wraps a route's placeholder in the one announcement a screen reader wants:
 * that something is loading, and what. `role="status"` already implies a polite
 * live region, so no `aria-live` is set alongside it.
 */
export function SkeletonScreen({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div role="status" aria-busy="true">
            <span className="sr-only">{label}</span>
            {children}
        </div>
    );
}
