const config = {
  api: {
    url: process.env.NEXT_PUBLIC_API_URL,
  },
  cms: {
    url: (process.env.NEXT_PUBLIC_CMS_URL || '').replace(/\/$/, ''),
  },
  site: {
    url: (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, ''),
  },
  accessTokenKey: process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || '__token__',
  /** Fallbacks only — the live values come from the Site Settings global. */
  seo: {
    name: 'Nigeria High Commission, Canberra',
    title: 'Nigeria High Commission, Canberra',
    titleTemplate: '%s | Nigeria High Commission, Canberra',
    description:
      'Consular services, visas & immigration, and trade & investment for Nigerians and partners across Australia and the Oceanic States.',
    image: '',
  },
};

export default config;
