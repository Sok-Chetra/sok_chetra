"use client";

import { motion } from "framer-motion";

export const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 20 20">
        <motion.path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
                closed: { d: "M2 5L18 5", transformOrigin: "50%" },
                open: { d: "M4 4L16 16", transformOrigin: "50%" },
            }}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1] // Custom cubic bezier for smoother animation
            }}
        />
        <motion.path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
                closed: { d: "M2 10L18 10", opacity: 1 },
                open: { d: "M2 10L18 10", opacity: 0 },
            }}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            transition={{
                duration: 0.1,
                ease: "linear"
            }}
        />
        <motion.path
            fill="transparent"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
                closed: { d: "M2 15L18 15", transformOrigin: "50%" },
                open: { d: "M4 16L16 4", transformOrigin: "50%" },
            }}
            initial={false}
            animate={isOpen ? "open" : "closed"}
            transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1] // Same as first path for consistency
            }}
        />
    </svg>
);