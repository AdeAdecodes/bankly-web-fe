import Head from 'next/head';
import React from 'react';
import config from '~/config';
import { getMediaUrl } from '~/helpers/media';
import { SiteSetting } from '~/types';

type PageSEOProps = Partial<{
  type: string;
  title: string;
  description: string;
  image: string;
  url: string;
  /** Live defaults (site name, title template, share image). */
  settings: SiteSetting;
  children: React.ReactNode;
}>;

function PageSEO({
  type = 'website',
  title,
  description,
  image,
  url,
  settings,
  children,
}: PageSEOProps) {
  const siteName = settings?.siteName || config.seo.name;
  const template = settings?.seo?.titleTemplate || config.seo.titleTemplate;
  const resolvedTitle = title
    ? title.toLowerCase().includes(siteName.toLowerCase())
      ? title // already brands itself (e.g. the homepage) — don't double up
      : template.replace('%s', title)
    : settings?.siteName
    ? `${settings.siteName}${
        settings.siteTagline ? `, ${settings.siteTagline}` : ''
      }`
    : config.seo.title;
  const resolvedDescription =
    description || settings?.seo?.defaultDescription || config.seo.description;
  const resolvedImage =
    image || getMediaUrl(settings?.ogImage) || config.seo.image;
  const resolvedUrl = url || config.site.url;

  return (
    <Head>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {resolvedUrl && <link rel="canonical" href={resolvedUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      {resolvedImage && <meta name="twitter:image" content={resolvedImage} />}

      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      {resolvedImage && <meta property="og:image" content={resolvedImage} />}
      {resolvedUrl && <meta property="og:url" content={resolvedUrl} />}

      {children}
    </Head>
  );
}

export default PageSEO;
