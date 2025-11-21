/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
    // Note: COOP/COEP headers are configured in vercel.json for production deployment
    // These headers enable SQLite OPFS persistence but only work when deployed to Vercel
    // In development mode, OPFS will not work (database is in-memory only)
};

module.exports = nextConfig;
