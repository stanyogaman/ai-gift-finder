/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: '**' }
    ]
  },
  transpilePackages: ['@awseen/ui', '@awseen/utils', '@awseen/types']
};

export default nextConfig;
