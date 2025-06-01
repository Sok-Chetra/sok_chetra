'use client'

import { menuItems } from "@/lib/constants/menuItems";
import Image from "next/image";
import { usePathname } from "next/navigation";
import MenuButton from "./MenuButton";
import { useEffect, useState } from "react";

export default function Menu() {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    return (
        <div className="hidden md:flex justify-center items-center mt-5 absolute w-full gap-5 z-20">
            <Image
                src={'https://i.pinimg.com/736x/28/32/25/2832251f86248ec7c38490ffaff30a44.jpg'}
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full aspect-square shadow-md"
                style={{ objectFit: 'cover' }}
                quality={100}
            />
            <div className="relative bg-gray-100 px-2.5 py-1.5 rounded-full flex shadow-md">
                {menuItems.map((item) => (
                    <MenuButton
                        key={item.id}
                        item={item}
                        isActive={pathname === item.path}
                        isMounted={isMounted}
                    />
                ))}
            </div>
        </div>
    );
}
