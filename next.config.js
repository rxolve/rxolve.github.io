import createMDX from "@next/mdx";
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    unoptimized: true,
  },
  reactStrictMode: false,
  distDir: "out",
  trailingSlash: true,
};

export default withMDX(nextConfig);
