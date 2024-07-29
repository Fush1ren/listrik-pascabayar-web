/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    eslint: {
        dirs: ['src'],
    },
};

export default nextConfig;
