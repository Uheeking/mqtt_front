/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: async () => {
        return [
            {
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'private, no-cache, no-store, max-age=0, must-revalidate',
                    },
                ],

                source: '/:path*',
            },
        ]
    }
};

export default nextConfig;
