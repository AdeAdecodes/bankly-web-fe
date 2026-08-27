/** @type {import('next').NextConfig} */

// Legacy static-site URLs (casa-web) → CMS-driven routes. All permanent (301).
const SERVICE_SLUGS = [
  'tourist-visa',
  'business-visa',
  'str-visa',
  'temporary-work-permit-visa',
  'e-passport',
  'emergency-travel-certificate',
  'nin-enrollment',
  'life-attestation-letter',
  'police-check-character-certificate',
  'certification-drivers-license',
  'certification-of-documents',
  'certification-personal-documents',
  'certification-products-import',
];

const PAGE_SLUGS = [
  'about-nigeria',
  'contact-us',
  'mission-staff',
  'trade-and-investments',
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',

  async redirects() {
    return [
      { source: '/home', destination: '/', statusCode: 301 },
      { source: '/index.html', destination: '/', statusCode: 301 },
      {
        source: `/:slug(${SERVICE_SLUGS.join('|')}).html`,
        destination: '/services/:slug',
        statusCode: 301,
      },
      {
        source: `/:slug(${PAGE_SLUGS.join('|')}).html`,
        destination: '/:slug',
        statusCode: 301,
      },
      { source: '/news/index.html', destination: '/news', statusCode: 301 },
      {
        source: '/news/:slug/index.html',
        destination: '/news/:slug',
        statusCode: 301,
      },
    ];
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
