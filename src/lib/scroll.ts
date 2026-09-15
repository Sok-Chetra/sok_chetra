/**
 * Smoothly scrolls an element into view.
 *
 * Preferred over `<a href="#id">` for repeat-use controls: once the URL hash
 * already matches the target, the browser treats a second click on the same
 * fragment as a no-op and will not scroll again.
 *
 * The `behavior` option passed here overrides the CSS `scroll-behavior`
 * property, so reduced-motion has to be honoured explicitly rather than relying
 * on the media query in globals.css.
 */
export function scrollToElement(target: Element | null | undefined) {
    if (!target) return;

    const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
    });
}

/** Convenience wrapper for targets addressed by id. */
export function scrollToId(id: string) {
    scrollToElement(document.getElementById(id));
}
