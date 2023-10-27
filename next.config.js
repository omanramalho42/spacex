/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  }
}

module.exports = { nextConfig, pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'] }
