import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { MainMenu } from "@/components/MainMenu";
import MotionProvider from "@/components/providers/MotionProvider";
import JsonLd from "@/components/seo/JsonLd";
import { SITE } from "@/lib/content/site";
import { buildPersonSchema, buildWebSiteSchema } from "@/lib/seo/structured-data";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap",
});

/**
 * Speed Insights loads its script from `/_vercel/speed-insights/script.js`, a
 * path served by Vercel's edge proxy and by nothing else. A local production
 * build (`next build && next start`) therefore requests it and gets a 404 —
 * a console error, and one lost Best Practices point in local Lighthouse runs.
 *
 * `VERCEL` is set by Vercel on every build, preview deployments included, so
 * gating on it keeps analytics wherever the endpoint actually exists and skips
 * the component only where it cannot work. Read at build time inside a Server
 * Component — deliberately not from a request header, which the caller
 * controls (same reasoning as the reCAPTCHA key switch in @/lib/recaptcha).
 */
const isOnVercel = Boolean(process.env.VERCEL);

export const metadata: Metadata = {
    // Set once here so every page can use relative canonical and OG image paths.
    metadataBase: new URL(SITE.url),
    title: {
        default: `${SITE.name} | ${SITE.role}`,
        template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className="scroll-smooth"
            // Next 16 no longer overrides scroll-behavior on navigation unless
            // this is present; without it every route change smooth-scrolls.
            data-scroll-behavior="smooth"
            suppressHydrationWarning
        >
            <head>
                {/* Must run before paint to avoid a flash of the wrong theme. */}
                <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
            </head>
            <body
                className={`${geistSans.variable} bg-gray-50 text-gray-900 antialiased transition-colors duration-300 dark:bg-gray-900 dark:text-gray-100`}
            >
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white"
                >
                    Skip to content
                </a>

                <JsonLd schema={buildPersonSchema()} />
                <JsonLd schema={buildWebSiteSchema()} />
                {isOnVercel && <SpeedInsights />}

                <MotionProvider>
                    <MainMenu />
                    <div id="main-content">{children}</div>
                </MotionProvider>
            </body>
        </html>
    );
}
