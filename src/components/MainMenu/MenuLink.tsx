"use client";

import { m } from "framer-motion";
import Link from "next/link";

import type { NavItem, NavItemId } from "@/lib/content/navigation";

type MenuLinkProps = {
    item: NavItem;
    pathname: string;
    /** Section the current route belongs to — see activeNavId. */
    activeId: NavItemId | null;
    onClick: () => void;
    className: string;
    activeClassName: string;
    inactiveClassName: string;
    isMobile?: boolean;
    setRef?: (element: HTMLAnchorElement | null) => void;
};

export const MenuLink = ({
    item,
    pathname,
    activeId,
    onClick,
    className,
    activeClassName,
    inactiveClassName,
    isMobile = false,
    setRef,
}: MenuLinkProps) => {
    // Two different things. On /portfolio the Portfolio link *is* the current
    // page; on /portfolio/ccfkh it is only the section that page sits in.
    // Highlighting follows the section so the pill has somewhere to rest,
    // while aria-current stays honest: "page" only for an exact match, and
    // "true" — the generic "current item of a set" — for the section.
    const isCurrentPage = pathname === item.path;
    const isActive = activeId === item.id;

    const link = (
        <Link
            href={item.path}
            ref={setRef}
            onClick={onClick}
            // Marks the current page for assistive tech — the colour change
            // alone conveys nothing to a screen reader.
            aria-current={isCurrentPage ? "page" : isActive ? "true" : undefined}
            className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
        >
            {item.label}
        </Link>
    );

    return isMobile ? <m.div whileTap={{ scale: 0.98 }}>{link}</m.div> : link;
};
