const MDX = require('@next/mdx')

const withMDX = MDX({
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        permanent: true,
        source: '/admin',
        destination: '/admin/requests',
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
