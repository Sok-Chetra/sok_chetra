import type { NextConfig } from "next";

/** Pages only. Static assets are already served `immutable` for a year. */
const PAGE_PATHS = ["/", "/about-me", "/portfolio", "/contact-me"];

/**
 * Sent with every response.
 *
 * Deliberately not a full Content Security Policy. Next writes each page's
 * data into inline <script> tags, so on static pages a script policy would
 * have to allow 'unsafe-inline' — which gives up most of what it protects
 * against — and the nonce alternative makes every page dynamic. These
 * directives restrict nothing the site itself does:
 * - frame-ancestors: no other site can show these pages in a frame, which
 *   is what clickjacking needs.
 * - object-src: no plugin content (<object>, <embed>).
 * - base-uri: an injected <base> cannot repoint every relative URL.
 * - form-action: forms can only submit to this origin.
 */
const SECURITY_HEADERS = [
    {
        key: "Content-Security-Policy",
        value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
    },
    // Stops browsers second-guessing a response's declared Content-Type.
    { key: "X-Content-Type-Options", value: "nosniff" },
];

const nextConfig: NextConfig = {
    experimental: {
        // Inlines the stylesheet into the HTML, removing the render-blocking
        // <link rel="stylesheet"> round trip before first paint.
        inlineCss: true,
    },
    /**
     * Dev-only, for opening the dev server from a phone on the same Wi-Fi.
     *
     * Only the *hostname* is matched — scheme, port and path are ignored, so
     * entries must be written bare. The previous value,
     * "http://192.168.110.186:3000", could therefore never match anything, and
     * it also named a subnet this machine is no longer on.
     *
     * Without a match the dev client is refused and hydration never completes,
     * which shows up as sections that stay invisible: Framer Motion writes
     * `opacity: 0` into the server HTML and nothing ever arrives to animate it
     * away. A wildcard per octet keeps this working when DHCP moves the box.
     */
    allowedDevOrigins: ["192.168.*.*"],
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
        return [
            { source: "/:path*", headers: SECURITY_HEADERS },
            ...PAGE_PATHS.map((source) => ({
                source,
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=60, stale-while-revalidate=86400",
                    },
                ],
            })),
        ];
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
