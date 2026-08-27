import { GetServerSideProps } from 'next';
import fetchPayloadCollection from '~/api/helpers/shared/fetch-payload-collection';
import config from '~/config';
import { getCollectionPath } from '~/helpers/get-action-href';

type Entry = { loc: string; lastmod?: string };

/** XML sitemap generated from published CMS content. */
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const base = config.site.url;

  const [pages, services, news] = await Promise.all([
    fetchPayloadCollection('pages', { limit: 500, depth: 0 }).catch(() => null),
    fetchPayloadCollection('consular-services', { limit: 500, depth: 0 }).catch(
      () => null
    ),
    fetchPayloadCollection('news-articles', {
      limit: 1000,
      depth: 0,
      sort: '-publishedDate',
    }).catch(() => null),
  ]);

  const entries: Entry[] = [
    ...(pages?.docs ?? []).map((page) => ({
      loc: `${base}${getCollectionPath('pages', page.slug)}`,
      lastmod: page.updatedAt,
    })),
    ...(services?.docs ?? []).map((service) => ({
      loc: `${base}${getCollectionPath('consular-services', service.slug)}`,
      lastmod: service.updatedAt,
    })),
    { loc: `${base}/news` },
    ...(news?.docs ?? []).map((article) => ({
      loc: `${base}${getCollectionPath('news-articles', article.slug)}`,
      lastmod: article.updatedAt,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) =>
      `  <url><loc>${escapeXml(entry.loc)}</loc>${
        entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''
      }</url>`
  )
  .join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );
  res.write(xml);
  res.end();

  return { props: {} };
};

function escapeXml(value: string) {
  return value.replace(
    /[<>&'"]/g,
    (char) =>
      ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[
        char
      ] as string)
  );
}

export default function Sitemap() {
  return null;
}
