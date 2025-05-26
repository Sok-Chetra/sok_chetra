import { useState } from "react";
import { MenuItemId } from "@/lib/constants/menuItems";

export default function useMenuAnimation(initialId: MenuItemId) {
    const [activeId, setActiveId] = useState<MenuItemId>(initialId);
    return { activeId, setActiveId };
}