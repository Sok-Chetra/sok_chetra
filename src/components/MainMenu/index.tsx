"use client";

import { m } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { DesktopMenu } from "./DesktopMenu";
import { HamburgerIcon } from "./HamburgerIcon";
import { MobileMenu } from "./MobileMenu";
import ThemeSwitch from "@/components/ui/ThemeSwitch";
import { activeNavId, NAV_ITEMS, type NavItemId } from "@/lib/content/navigation";

const MOBILE_MENU_ID = "mobile-menu";

export const MainMenu = () => {
    const pathname = usePathname();

    const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
    const [hasMounted, setHasMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    const itemRefs = useRef<Record<NavItemId, HTMLAnchorElement | null>>(
        Object.fromEntries(NAV_ITEMS.map((item) => [item.id, null])) as Record<
            NavItemId,
            HTMLAnchorElement | null
        >
    );

    const activeId = activeNavId(pathname);

    const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

    /** Moves the sliding pill behind the active desktop link. */
    const updateHighlight = useCallback((id: NavItemId | null) => {
        // No nav item matches this route (the 404): collapse the pill rather
        // than parking it under an arbitrary item. Deferred into a frame like
        // the measuring path below, so the calling effect never sets state
        // synchronously (react-hooks/set-state-in-effect).
        if (id === null) {
            requestAnimationFrame(() => setHighlightStyle({ left: 0, width: 0 }));
            return;
        }

        const element = itemRefs.current[id];
        if (!element || element.offsetParent === null) return;

        requestAnimationFrame(() => {
            /**
             * Measure against the list, not the link's immediate parent. Each
             * link sits inside its own <li>, so using parentElement made every
             * offset resolve to 0 and pinned the pill to the first item.
             */
            const list = element.closest("ul");
            if (!list) return;

            const rect = element.getBoundingClientRect();
            const listRect = list.getBoundingClientRect();

            setHighlightStyle({ left: rect.left - listRect.left, width: rect.width });
        });
    }, []);

    useEffect(() => {
        updateHighlight(activeId);

        // Suppress the pill's transition on first paint so it doesn't slide in
        // from the left on load.
        const timer = setTimeout(() => setHasMounted(true), 50);
        return () => clearTimeout(timer);
    }, [activeId, updateHighlight]);

    useEffect(() => {
        const handleResize = () => updateHighlight(activeId);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeId, updateHighlight]);

    // Dismiss on outside click, on Escape, and on browser back/forward.
    useEffect(() => {
        const handlePointerDown = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                closeMobileMenu();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            closeMobileMenu();
            // Return focus to the control that opened the menu.
            toggleButtonRef.current?.focus();
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("popstate", closeMobileMenu);

        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("popstate", closeMobileMenu);
        };
    }, [closeMobileMenu]);

    return (
        <>
            <DesktopMenu
                highlightStyle={highlightStyle}
                hasMounted={hasMounted}
                pathname={pathname}
                activeId={activeId}
                itemRefs={itemRefs}
                onItemClick={closeMobileMenu}
            />

            <div className="fixed top-4 right-4 z-50 flex items-center gap-2 md:hidden">
                <ThemeSwitch
                    trigger="click"
                    surfaceClassName="border border-gray-100 bg-white/80 shadow-sm backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/90 dark:shadow-gray-700/20"
                />

                <div className="relative" ref={mobileMenuRef}>
                    <m.button
                        ref={toggleButtonRef}
                        type="button"
                        className="rounded-full border border-gray-100 bg-white/80 p-2 text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-700/50 dark:bg-gray-800/90 dark:text-gray-300 dark:shadow-gray-700/20 dark:hover:bg-gray-700/80"
                        onClick={() => setIsMobileMenuOpen((open) => !open)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls={MOBILE_MENU_ID}
                    >
                        <HamburgerIcon isOpen={isMobileMenuOpen} />
                    </m.button>

                    <MobileMenu
                        id={MOBILE_MENU_ID}
                        isOpen={isMobileMenuOpen}
                        pathname={pathname}
                        activeId={activeId}
                        onItemClick={closeMobileMenu}
                    />
                </div>
            </div>
        </>
    );
};
