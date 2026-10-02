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

/**
 * The choice for this visit, for when storage cannot hold it.
 *
 * A browser that blocks site storage throws on every read and write. Reads were
 * already guarded but fell back to "system", so the picker would show System
 * over a page that had just turned dark. Falling back to this instead keeps the
 * two in agreement for as long as the page is open.
 */
let sessionTheme: Theme = "system";

/** Applies a theme choice to the document and persists it where it can. */
export function applyTheme(theme: Theme) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && prefersDark);

    document.documentElement.classList.toggle("dark", isDark);
    sessionTheme = theme;

    /*
     * Guarded because this runs inside a click handler, and error boundaries do
     * not catch errors thrown from event handlers. Unguarded, a blocked write
     * threw after the page had already changed colour, so the code after it —
     * telling the picker the theme changed, and collapsing it — never ran.
     */
    try {
        if (theme === "system") {
            localStorage.removeItem(THEME_STORAGE_KEY);
        } else {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        }
    } catch {
        /* Storage blocked: the choice holds for this visit via sessionTheme. */
    }
}

export function readStoredTheme(): Theme {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return stored === "light" || stored === "dark" ? stored : "system";
    } catch {
        return sessionTheme;
    }
}
