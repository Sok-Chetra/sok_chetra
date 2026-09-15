export type Theme = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme";

export const THEME_ORDER: Theme[] = ["light", "dark", "system"];

/**
 * Runs before first paint, in <head>, to stamp the `.dark` class on <html>
 * before the browser renders anything. Without it the page paints in the wrong
 * theme for a frame — the classic dark-mode flash.
 *
 * Kept as a string because it must execute synchronously, ahead of hydration.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored === 'dark' || (stored !== 'light' && prefersDark);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`.trim();

/** Applies a theme choice to the document and persists it. */
export function applyTheme(theme: Theme) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && prefersDark);

    document.documentElement.classList.toggle("dark", isDark);

    if (theme === "system") {
        localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
}

export function readStoredTheme(): Theme {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return stored === "light" || stored === "dark" ? stored : "system";
    } catch {
        return "system";
    }
}
