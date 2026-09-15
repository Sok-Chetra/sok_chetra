"use client";

import { m } from "framer-motion";

import { MenuLink } from "./MenuLink";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import { NAV_ITEMS, type NavItemId } from "@/lib/content/navigation";

type DesktopMenuProps = {
    highlightStyle: { left: number; width: number };
    hasMounted: boolean;
    pathname: string;
    itemRefs: React.RefObject<Record<NavItemId, HTMLAnchorElement | null>>;
    onItemClick: () => void;
};

const SURFACE =
    "bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm dark:shadow-gray-700/20 border border-gray-100 dark:border-gray-700/50";

export const DesktopMenu = ({
    highlightStyle,
    hasMounted,
    pathname,
    itemRefs,
    onItemClick,
}: DesktopMenuProps) => (
    <div className="fixed z-50 mt-5 hidden w-full items-center justify-center gap-3 md:flex">
        <nav aria-label="Main" className={`relative flex rounded-full px-3 py-1.5 ${SURFACE}`}>
            <ul className="relative flex">
                <m.li
                    aria-hidden
                    className="absolute top-0 bottom-0 rounded-full bg-blue-500/90"
                    initial={false}
                    animate={highlightStyle}
                    transition={
                        hasMounted ? { type: "spring", stiffness: 500, damping: 30 } : { duration: 0 }
                    }
                />

                {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                        <MenuLink
                            item={item}
                            pathname={pathname}
                            onClick={onItemClick}
                            setRef={(element) => {
                                itemRefs.current[item.id] = element;
                            }}
                            className="relative block px-4 py-2 font-medium transition-colors duration-200 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            activeClassName="text-white"
                            inactiveClassName="text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                        />
                    </li>
                ))}
            </ul>
        </nav>

        <ThemeSwitch trigger="hover" surfaceClassName={SURFACE} />
    </div>
);
