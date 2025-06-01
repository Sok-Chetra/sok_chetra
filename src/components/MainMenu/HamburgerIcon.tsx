// src/components/MainMenu/HamburgerIcon.tsx
"use client";

import { motion } from "framer-motion";

export const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <svg width="20" height="20" viewBox="0 0 20 20">
        <motion.path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
                closed: { d: "M2 5L18 5" },
                open: { d: "M4 4L16 16" },
            }}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
        />
        <motion.path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
                closed: { d: "M2 10L18 10", opacity: 1 },
                open: { d: "M2 10L18 10", opacity: 0 },
            }}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.1 }}
        />
        <motion.path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
                closed: { d: "M2 15L18 15" },
                open: { d: "M4 16L16 4" },
            }}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.2 }}
        />
    </svg>
);