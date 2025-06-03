export const menuItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about-me", label: "About Me", path: "/about-me" },
    { id: "portfolio", label: "Portfolio", path: "/portfolio" },
] as const; // `as const` for literal type inference

// Infer the type from the array
export type MenuItemId = typeof menuItems[number]["id"];