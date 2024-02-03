/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "shopp-production.up.railway.app",
         },
         {
            protocol: "http",
            hostname: "localhost",
         },
      ],
   },
};

module.exports = nextConfig;
