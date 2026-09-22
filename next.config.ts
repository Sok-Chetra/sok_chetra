import type { NextConfig } from "next";

/**
 * Pages only. Static assets are already served `immutable` for a year, and the
 * API route must never be cached.
 */
const PAGE_PATHS = ["/", "/about-me", "/portfolio", "/contact-me"];

const nextConfig: NextConfig = {
    experimental: {
        // Inlines the stylesheet into the HTML, removing the render-blocking
        // <link rel="stylesheet"> round trip before first paint.
        inlineCss: true,
    },
    // Dev-only: allows the LAN address to load the dev server's assets.
    allowedDevOrigins: ["http://192.168.110.186:3000"],
    /**
     * Next serves prerendered pages as `max-age=0, must-revalidate`, so every
     * reload waits on a network round trip before it can paint anything — the
     * pause visible before the entrance animation starts on a phone. Allowing
     * a short freshness window lets the browser paint from cache immediately
     * and check for a new version in the background.
     *
     * The cost is that a reload within a minute of a deploy can show the
     * previous version once. Safe here because the HTML references
     * content-hashed assets, which stay available across deploys.
     */
    async headers() {
        return PAGE_PATHS.map((source) => ({
            source,
            headers: [
                {
                    key: "Cache-Control",
                    value: "public, max-age=60, stale-while-revalidate=86400",
                },
            ],
        }));
    },
    images: {
        /**
         * Optimization is on (it was previously disabled wholesale), so Next
         * generates correctly sized AVIF/WebP variants per device. This is what
         * makes a single high-resolution source sufficient — no hand-maintained
         * "-mobile" copies.
         */
        formats: ["image/avif", "image/webp"],
        // Project screenshots are static and versioned; cache them hard.
        minimumCacheTTL: 31_536_000,
    },
};

export default nextConfig;
