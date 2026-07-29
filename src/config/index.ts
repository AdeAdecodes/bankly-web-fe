const config = {
  api: {
    url: process.env.NEXT_PUBLIC_API_URL,
  },
  cms: {
    url: process.env.NEXT_PUBLIC_CMS_URL,
  },
  app: {
    googlePlayUrl:
      process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ||
      'https://play.google.com/store/apps/details?id=com.bankly.bloomm',
    appStoreUrl:
      process.env.NEXT_PUBLIC_APP_STORE_URL ||
      'https://apps.apple.com/us/app/bankly/id1582452537',
  },
  accessTokenKey: process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || '__token__',
  seo: {
    name: 'Bankly',
    title: 'Bankly',
    titleTemplate: '%s | Bankly',
    description: '',
    url: '',
    image: '',
    socials: {
      twitter: '',
    },
  },
};

export default config;
