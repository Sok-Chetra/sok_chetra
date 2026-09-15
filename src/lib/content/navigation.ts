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
 * Resolves a pathname to its nav item, or `null` when the route is not in the
 * menu at all — the 404 being the case that matters. Falling back to Home there
 * put the highlight pill behind "Home" while `MenuLink` (which compares the
 * pathname directly) correctly withheld `aria-current`, so the pill claimed a
 * current page that the accessibility tree denied.
 */
export function activeNavId(pathname: string): NavItemId | null {
    return NAV_ITEMS.find((item) => item.path === pathname)?.id ?? null;
}
