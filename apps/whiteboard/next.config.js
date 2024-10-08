//@ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const withLlamaIndex = require('llamaindex/next').default;

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
let nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
    ],
  },
  transpilePackages: [],
  experimental: {
    serverComponentsExternalPackages: [
      'sharp',
      'onnxruntime-node',
      'llamaindex',
      // 'node:async_hooks',
    ],
  },
};
nextConfig = withLlamaIndex(nextConfig);

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
