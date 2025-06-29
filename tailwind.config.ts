// tailwind.config.ts
import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme")

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {

        },
    },
    darkMode: 'class',
    plugins: [],
};

export default config;
