/** The site's primary navigation. The only place menu items are defined. */
export const NAV_ITEMS = [
    { id: "home", label: "Home", path: "/" },
    { id: "about-me", label: "About Me", path: "/about-me" },
    { id: "portfolio", label: "Portfolio", path: "/portfolio" },
    { id: "contact-me", label: "Contact Me", path: "/contact-me" },
] as const;

export type NavItem = (typeof NAV_ITEMS)[number];
export type NavItemId = NavItem["id"];

/**
 * Resolves a pathname to its nav item, or `null` when the route belongs to no
 * section at all — the 404 being the case that matters. Falling back to Home
 * there parked the highlight pill under "Home" while the link itself withheld
 * `aria-current`, so the pill claimed a current page the accessibility tree
 * denied.
 *
 * A nested route resolves to the section containing it: /portfolio/<slug> is
 * Portfolio. Without this the pill collapsed to zero width on every project
 * page, which read as it sliding off to the left.
 */
export function activeNavId(pathname: string): NavItemId | null {
    const exact = NAV_ITEMS.find((item) => item.path === pathname);
    if (exact) return exact.id;

    // "/" is excluded: it prefixes everything, so it would match every route.
    const section = NAV_ITEMS.find(
        (item) => item.path !== "/" && pathname.startsWith(`${item.path}/`)
    );

    return section?.id ?? null;
}
