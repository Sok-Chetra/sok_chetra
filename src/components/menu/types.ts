import { menuItems } from "@/lib/constants/menuItems";

export type MenuItem = typeof menuItems[number];
export type MenuItemId = MenuItem["id"];

export interface MenuProps {
    items: readonly MenuItem[] | MenuItem[]; // Accepts both readonly and mutable arrays
    initialActiveId?: MenuItemId;
}