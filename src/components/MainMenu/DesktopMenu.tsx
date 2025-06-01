// src/components/MainMenu/DesktopMenu.tsx
"use client";

import { motion } from "framer-motion";
import { NAV_BUTTONS } from "./navButtons";
import { MenuItem, MenuItemId } from "./types";

export const DesktopMenu = ({
    highlightStyle,
    hasMounted,
    pathname,
    itemRefs,
    onItemClick,
}: {
    highlightStyle: { left: number; width: number };
    hasMounted: boolean;
    pathname: string;
    itemRefs: React.RefObject<Record<MenuItemId, HTMLButtonElement | null>>;
    onItemClick: (item: MenuItem) => void;
}) => (
    <motion.nav className="hidden md:flex justify-center items-center mt-5 fixed w-full gap-5 z-50">
        <div className="relative bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex shadow-sm dark:shadow-gray-700/20 border border-gray-100 dark:border-gray-700/50">
            <div className="relative flex">
                <motion.div
                    className="absolute top-0 bottom-0 bg-blue-500/90 rounded-full"
                    initial={false}
                    animate={highlightStyle}
                    transition={
                        hasMounted
                            ? {
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                            }
                            : { duration: 0 }
                    }
                />

                {NAV_BUTTONS.map((item) => (
                    <button
                        key={item.id}
                        ref={(el) => {
                            if (itemRefs.current) {
                                itemRefs.current[item.id] = el;
                            }
                        }}
                        className={`relative px-4 py-2 font-medium transition-colors duration-200 ${pathname === item.path
                            ? "text-white"
                            : "text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            }`}
                        onClick={() => onItemClick(item)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    </motion.nav>
);