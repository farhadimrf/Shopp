/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "http",
            hostname: "localhost",
         },
         {
            protocol: "https",
            hostname: "shop-production-4e2a.up.railway.app/",
         },
      ],
   },
};

module.exports = nextConfig;
