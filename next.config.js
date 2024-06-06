import createMDX from '@next/mdx';
const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? '/rxolve.github.io' : '',
  assetPrefix: isProd ? '/rxolve.github.io/' : '',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    unoptimized: true,
  },
};

export default withMDX(nextConfig);
