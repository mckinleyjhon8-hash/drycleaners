/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // static HTML export → ./out (for Cloudflare Pages)
  images: { unoptimized: true }, // no Image Optimization server in a static export
};

export default nextConfig;
