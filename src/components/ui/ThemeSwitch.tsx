"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { useIsHydrated } from "@/lib/hooks/useIsHydrated";
import { useTheme } from "@/lib/hooks/useTheme";
import { THEME_OPTIONS } from "./themeOptions";

/** Height of one option row, in px. Animated to 0 to collapse it away. */
const OPTION_SIZE = 30;
/** Collapsed footprint: one option plus the pill's 4px padding. */
const COLLAPSED = OPTION_SIZE + 8;

type ThemeSwitchProps = {
    /** "hover" suits pointer devices; "click" is required where hover doesn't exist. */
    trigger?: "hover" | "click";
    /** Styling for the pill surface itself. */
    surfaceClassName?: string;
    className?: string;
};

/**
 * Three-way theme control that stays collapsed to the active option and expands
 * downward to reveal the rest.
 *
 * It expands vertically inside an absolutely positioned pill, so the surrounding
 * header keeps a fixed footprint and nothing shifts when it opens.
 *
 * The active option is pinned to the top with CSS `order` rather than by
 * reordering the array, so it never moves as the pill grows — otherwise the
 * icon would slide out from under the cursor mid-hover. DOM order stays
 * Light/Dark/System for assistive tech.
 */
export default function ThemeSwitch({
    trigger = "hover",
    surfaceClassName = "",
    className = "",
}: ThemeSwitchProps) {
    const { theme, selectTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    /**
     * The stored theme is unknowable on the server, so SSR renders the neutral
     * "system" option. Revealing the control only once hydrated avoids showing
     * that placeholder icon and then animating it out when the real preference
     * arrives. The footprint is reserved either way, so nothing shifts.
     */
    const isHydrated = useIsHydrated();

    const containerRef = useRef<HTMLDivElement>(null);
    const isClickTriggered = trigger === "click";

    const transition =
        prefersReducedMotion || !isHydrated
            ? { duration: 0 }
            : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.6 };

    // Click mode needs explicit dismissal; hover mode closes on mouse-out.
    useEffect(() => {
        if (!isClickTriggered || !isOpen) return;

        const handlePointerDown = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isClickTriggered, isOpen]);

    const hoverHandlers = isClickTriggered
        ? {}
        : { onMouseEnter: () => setIsOpen(true), onMouseLeave: () => setIsOpen(false) };

    /**
     * Focus opens the group only in hover mode, where it stands in for a hover
     * that keyboard users cannot produce.
     *
     * In click mode it must not: pressing the mouse focuses the button *before*
     * the click fires, so focus would open the group and the click would then
     * see it as already open, select, and close it again — the panel would
     * never appear. Click mode instead opens and selects entirely from onClick,
     * which keyboard Enter/Space triggers too.
     */
    const focusHandlers = isClickTriggered
        ? {}
        : {
              onFocusCapture: () => setIsOpen(true),
              onBlurCapture: (event: React.FocusEvent<HTMLDivElement>) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setIsOpen(false);
                  }
              },
          };

    return (
        <div
            ref={containerRef}
            // Fixed footprint — the expanding pill is absolutely positioned on
            // top of it, so the nav never reflows.
            style={{ width: COLLAPSED, height: COLLAPSED }}
            className={`relative ${className}`}
            {...hoverHandlers}
        >
            <div
                role="radiogroup"
                aria-label="Colour theme"
                {...focusHandlers}
                aria-hidden={!isHydrated || undefined}
                style={{ opacity: isHydrated ? 1 : 0 }}
                className={`absolute top-0 right-0 flex flex-col items-center overflow-hidden rounded-full p-1 transition-opacity duration-200 ${surfaceClassName}`}
            >
                {THEME_OPTIONS.map(({ value, label, Icon }) => {
                    const isActive = theme === value;
                    const isVisible = isOpen || isActive;

                    return (
                        <m.div
                            key={value}
                            initial={false}
                            animate={{
                                height: isVisible ? OPTION_SIZE : 0,
                                opacity: isVisible ? 1 : 0,
                                scale: isVisible ? 1 : 0.6,
                            }}
                            transition={transition}
                            style={{ order: isActive ? -1 : 0 }}
                            className="flex w-[30px] shrink-0 items-center justify-center overflow-hidden"
                        >
                            <button
                                type="button"
                                role="radio"
                                aria-checked={isActive}
                                title={label}
                                // Invisible controls must not be tabbable:
                                // neither a collapsed option nor anything at all
                                // before hydration reveals the group.
                                tabIndex={isHydrated && isVisible ? 0 : -1}
                                onClick={() => {
                                    // Collapsed, the only visible button is the
                                    // active one; tapping it opens the group
                                    // rather than re-selecting what's already set.
                                    if (!isOpen) {
                                        setIsOpen(true);
                                        return;
                                    }
                                    selectTheme(value);
                                    // Collapse on choosing so the pill settles back to
                                    // the icon you just chose — that collapse is
                                    // the confirmation the choice registered.
                                    setIsOpen(false);
                                }}
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                                    isActive
                                        ? "bg-blue-500/90 text-white"
                                        : "text-slate-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/70"
                                }`}
                            >
                                <Icon size={15} aria-hidden />
                                <span className="sr-only">{label}</span>
                            </button>
                        </m.div>
                    );
                })}
            </div>
        </div>
    );
}
