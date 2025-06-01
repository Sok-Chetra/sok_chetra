// src/components/MainMenu/index.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MenuItem, MenuItemId } from "./types";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { HamburgerIcon } from "./HamburgerIcon";
import { motion } from "framer-motion";
import { NAV_BUTTONS } from "./navButtons";

export const MainMenu = () => {
    const pathname = usePathname();
    const router = useRouter();

    const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
    const highlightRef = useRef({ left: 0, width: 0 });
    const [hasMounted, setHasMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Record<MenuItemId, HTMLButtonElement | null>>(
        Object.fromEntries(
            NAV_BUTTONS.map((item) => [item.id, null])
        ) as Record<MenuItemId, HTMLButtonElement | null>
    );

    const activeItem = NAV_BUTTONS.find((item) => item.path === pathname);
    const activeId = activeItem?.id || "home";

    const updateHighlight = (id: MenuItemId) => {
        const el = itemRefs.current[id];
        if (el && el.offsetParent !== null) {
            requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                const parentRect = el.parentElement!.getBoundingClientRect();
                const newStyle = {
                    left: rect.left - parentRect.left,
                    width: rect.width,
                };
                setHighlightStyle(newStyle);
                highlightRef.current = newStyle;
            });
        }
    };

    const handleItemClick = (item: MenuItem) => {
        router.push(item.path);
        setIsMobileMenuOpen(false);
        requestAnimationFrame(() => updateHighlight(item.id));
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        updateHighlight(activeId);
        const timer = setTimeout(() => setHasMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        updateHighlight(activeId);
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => updateHighlight(activeId);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeId]);

    return (
        <>
            <DesktopMenu
                highlightStyle={highlightStyle}
                hasMounted={hasMounted}
                pathname={pathname}
                itemRefs={itemRefs}
                onItemClick={handleItemClick}
            />

            <div className="md:hidden fixed top-4 right-4 z-50" ref={mobileMenuRef}>
                <motion.button
                    className="p-2 rounded-full bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm dark:shadow-gray-700/20 text-slate-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors border border-gray-100 dark:border-gray-700/50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <HamburgerIcon isOpen={isMobileMenuOpen} />
                </motion.button>

                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    pathname={pathname}
                    onItemClick={handleItemClick}
                />
            </div>
        </>
    );
};