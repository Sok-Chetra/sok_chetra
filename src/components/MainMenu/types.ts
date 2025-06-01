// src/components/MainMenu/types.ts
export const menuItems = [
    { id: "home", label: "Home", path: "/" },
    { id: "about-me", label: "About Me", path: "/about-me" },
] as const;

export type MenuItemId = typeof menuItems[number]["id"];
export type MenuItem = typeof menuItems[number];