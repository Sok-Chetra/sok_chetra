// src/components/MainMenu/navButtons.ts
import { menuItems } from "./types";

export const NAV_BUTTONS = menuItems.map(item => ({
    ...item,
    className: "px-4 py-2 relative z-10",
}));