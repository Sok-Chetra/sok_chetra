import { motion } from "framer-motion";
import { MenuItem } from "./types";
import Link from "next/link";

interface MenuButtonProps {
    item: MenuItem;
    isActive: boolean;
    isMounted: boolean;
}

export default function MenuButton({ item, isActive, isMounted }: MenuButtonProps) {
    return (
        <Link href={item.path as string}>
            <motion.span
                className="px-4 py-2 relative z-10 block cursor-pointer"
                whileHover={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
            >
                {isActive && (
                    <motion.div
                        layoutId="menu-bg"
                        className="absolute inset-0 bg-blue-500 rounded-full -z-10"
                        initial={isMounted ? false : { opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 27 }}
                    />
                )}
                <span className={`relative z-10 ${isActive ? "text-white" : "text-slate-800 dark:text-dark"}`}>
                    {item.label}
                </span>
            </motion.span>
        </Link>
    );
}
