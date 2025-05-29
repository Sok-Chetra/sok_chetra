import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/about-me',
                destination: 'https://sok-chetra.me/about-me.html',
            }
        ]
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
