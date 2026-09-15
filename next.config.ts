import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        // Inlines the stylesheet into the HTML, removing the render-blocking
        // <link rel="stylesheet"> round trip before first paint.
        inlineCss: true,
    },
    // Dev-only: allows the LAN address to load the dev server's assets.
    allowedDevOrigins: ["http://192.168.110.186:3000"],
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
