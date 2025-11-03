/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nexcuraappimages.s3.us-east-2.amazonaws.com'], 
     remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
