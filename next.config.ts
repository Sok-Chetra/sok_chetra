import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['http://192.168.110.186:3000'],
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
