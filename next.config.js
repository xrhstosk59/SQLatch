/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    // Keep Next.js anchored to this project root even if parent directories
    // also contain lockfiles.
    outputFileTracingRoot: __dirname,
    images: {
        unoptimized: true,
    },
    // Note: COOP/COEP headers are configured in vercel.json for production deployment
    // These headers enable SQLite OPFS persistence but only work when deployed to Vercel
    // In development mode, OPFS will not work (database is in-memory only)
};

module.exports = nextConfig;
