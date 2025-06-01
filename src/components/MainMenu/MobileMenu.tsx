// src/components/MainMenu/MobileMenu.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { NAV_BUTTONS } from "./navButtons";
import { MenuItem } from "./types";

export const MobileMenu = ({
    isOpen,
    pathname,
    onItemClick,
}: {
    isOpen: boolean;
    pathname: string;
    onItemClick: (item: MenuItem) => void;
}) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-sm dark:shadow-gray-700/20 py-2 px-2 border border-gray-100 dark:border-gray-700/50"
            >
                {NAV_BUTTONS.map((item) => (
                    <motion.button
                        key={item.id}
                        className={`block w-full text-left px-4 py-2.5 text-sm font-medium transition-colors rounded-md ${pathname === item.path
                                ? "bg-blue-500/90 text-white"
                                : "text-slate-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-700/50"
                            }`}
                        onClick={() => onItemClick(item)}
                        whileTap={{ scale: 0.98 }}
                    >
                        {item.label}
                    </motion.button>
                ))}
            </motion.div>
        )}
    </AnimatePresence>
);