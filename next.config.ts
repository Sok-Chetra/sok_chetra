import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['*.ngrok-free.app'],
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
