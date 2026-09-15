import type { IconType } from "react-icons";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";

import type { Theme } from "@/lib/theme";

/** Single source of truth for both theme controls. */
export const THEME_OPTIONS: ReadonlyArray<{ value: Theme; label: string; Icon: IconType }> = [
    { value: "light", label: "Light", Icon: FiSun },
    { value: "dark", label: "Dark", Icon: FiMoon },
    { value: "system", label: "System", Icon: FiMonitor },
];
