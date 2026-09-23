"use client";

import { AnimatePresence, m } from "framer-motion";

import { MenuLink } from "./MenuLink";
import { NAV_ITEMS, type NavItemId } from "@/lib/content/navigation";

type MobileMenuProps = {
    id: string;
    isOpen: boolean;
    pathname: string;
    activeId: NavItemId | null;
    onItemClick: () => void;
};

export const MobileMenu = ({
    id,
    isOpen,
    pathname,
    activeId,
    onItemClick,
}: MobileMenuProps) => (
    <AnimatePresence>
        {isOpen && (
            <m.nav
                id={id}
                aria-label="Main"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-100 bg-white/90 px-2 py-2 shadow-sm backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/95 dark:shadow-gray-700/20"
            >
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <MenuLink
                                item={item}
                                pathname={pathname}
                                activeId={activeId}
                                onClick={onItemClick}
                                isMobile
                                className="block w-full rounded-md px-4 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                activeClassName="bg-blue-500/90 text-white"
                                inactiveClassName="text-slate-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/50"
                            />
                        </li>
                    ))}
                </ul>
            </m.nav>
        )}
    </AnimatePresence>
);
