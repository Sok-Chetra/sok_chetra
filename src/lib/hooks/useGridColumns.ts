"use client";

import { useEffect, useState } from "react";

/**
 * Reports how many columns the projects grid is currently rendering, matching
 * the Tailwind classes `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
 *
 * The grid itself is laid out by CSS; this only exists so pagination can work
 * out how many cards fit on a page. It starts at the mobile value so the
 * server-rendered markup and the first client render agree.
 */
export function useGridColumns(): number {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        const read = () => {
            const width = window.innerWidth;
            if (width >= 1024) return 3;
            if (width >= 640) return 2;
            return 1;
        };

        const update = () => setColumns(read());

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    return columns;
}
