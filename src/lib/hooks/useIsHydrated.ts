"use client";

import { useSyncExternalStore } from "react";

/** Never changes, so React never needs to re-read the snapshot. */
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * False during SSR and the first (hydration) render, true afterwards.
 *
 * Implemented with useSyncExternalStore rather than a mount effect so it does
 * not call setState from an effect body, and so React uses the server value for
 * hydration — the markup matches, then updates on the next render.
 */
export function useIsHydrated(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
