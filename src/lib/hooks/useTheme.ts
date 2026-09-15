"use client";

import { useCallback, useSyncExternalStore } from "react";

import { applyTheme, readStoredTheme, type Theme } from "@/lib/theme";

/** Same-tab notification; `storage` only fires in *other* tabs. */
const THEME_CHANGE_EVENT = "themechange";

function subscribe(onStoreChange: () => void) {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleMediaChange = () => {
        // Following the system means re-applying the class when the OS flips.
        if (readStoredTheme() === "system") applyTheme("system");
        onStoreChange();
    };

    window.addEventListener("storage", onStoreChange);
    window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
    media.addEventListener("change", handleMediaChange);

    return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
        media.removeEventListener("change", handleMediaChange);
    };
}

/** Server and hydration snapshot — the pre-paint script has already applied
 *  the real class, so rendering the neutral default here is safe. */
const getServerSnapshot = (): Theme => "system";

/**
 * Theme preference, read through useSyncExternalStore because localStorage and
 * matchMedia are exactly the "external store" this hook is designed for. It
 * also gives correct SSR/hydration behaviour for free.
 */
export function useTheme() {
    const theme = useSyncExternalStore(subscribe, readStoredTheme, getServerSnapshot);

    const selectTheme = useCallback((next: Theme) => {
        applyTheme(next);
        window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
    }, []);

    return { theme, selectTheme };
}
