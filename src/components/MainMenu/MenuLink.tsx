"use client";

import { m } from "framer-motion";
import Link from "next/link";

import type { NavItem } from "@/lib/content/navigation";

type MenuLinkProps = {
    item: NavItem;
    pathname: string;
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
    onClick,
    className,
    activeClassName,
    inactiveClassName,
    isMobile = false,
    setRef,
}: MenuLinkProps) => {
    const isActive = pathname === item.path;

    const link = (
        <Link
            href={item.path}
            ref={setRef}
            onClick={onClick}
            // Marks the current page for assistive tech — the colour change
            // alone conveys nothing to a screen reader.
            aria-current={isActive ? "page" : undefined}
            className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
        >
            {item.label}
        </Link>
    );

    return isMobile ? <m.div whileTap={{ scale: 0.98 }}>{link}</m.div> : link;
};
