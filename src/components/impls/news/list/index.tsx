import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { NEWS_CATEGORY_LABELS, ROUTES } from '~/constants';
import ContentBox from '~/components/generics/content-box';
import CssGrid from '~/components/shared/css-grid';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import PageSEO from '~/components/shared/page-seo';
import { getCollectionPath } from '~/helpers/get-action-href';
import { fonts } from '~/theme/tokens';
import { NewsArticle, PayloadResponse, SiteSetting } from '~/types';
import { formatDate } from '~/utils/date';
import ArticleCard, { ArticleThumb, CategoryChip } from '../article-card';

export type NewsListProps = {
  result: PayloadResponse<NewsArticle>;
  category?: string | null;
  settings?: SiteSetting;
};

const CATEGORIES = Object.entries(NEWS_CATEGORY_LABELS) as [
  NewsArticle['category'],
  string
][];

/** News listing (casa-web `news/index.html`): hero, category filters, featured + grid. */
function NewsList({ result, category, settings }: NewsListProps) {
  const isDefaultView = !category && result.page === 1;
  const [featured, ...rest] = result.docs;
  const grid = isDefaultView ? rest : result.docs;

  return (
    <React.Fragment>
      <PageSEO
        title="News & Updates"
        description="Latest news, announcements, updates and activities from the Nigeria High Commission in Canberra."
        settings={settings}
      />

      <Box
        component="section"
        sx={{ bgcolor: 'brand.cream', borderBottom: 1, borderColor: 'divider' }}
      >
        <ContentBox sx={{ py: { xs: 5, md: 6.5 }, textAlign: 'center' }}>
          <Box maxWidth={700} mx="auto">
            <Typography variant="eyebrow" color="secondary.dark">
              News &amp; Updates
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 29, md: 36 },
                color: 'primary.dark',
                mt: 1.75,
              }}
            >
              Latest News
            </Typography>
            <Typography
              sx={{
                fontSize: 15.5,
                color: 'text.secondary',
                lineHeight: 1.7,
                mt: 1.75,
              }}
            >
              Stay informed with the latest news, announcements, updates and
              activities from the Nigeria High Commission in Canberra.
            </Typography>
          </Box>
        </ContentBox>
      </Box>

      <Box component="section">
        <ContentBox sx={{ pt: { xs: 5, md: 7 }, pb: { xs: 8, md: 12 } }}>
          <Row
            role="group"
            aria-label="Filter by category"
            gap={1}
            flexWrap="wrap"
            mb={5}
            mainAxisAlignment="center"
          >
            <FilterChip label="All" href={ROUTES.news} active={!category} />
            {CATEGORIES.map(([value, label]) => (
              <FilterChip
                key={value}
                label={label}
                href={`${ROUTES.news}?category=${value}`}
                active={category === value}
              />
            ))}
          </Row>

          {isDefaultView && featured && <Featured article={featured} />}

          {grid.length > 0 ? (
            <CssGrid columns={{ xs: 1, sm: 2, md: 3 }} spacing={3.5}>
              {grid.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </CssGrid>
          ) : (
            !featured && (
              <Box
                textAlign="center"
                sx={{
                  py: 8,
                  px: 2.5,
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: '14px',
                }}
              >
                <Typography sx={{ color: 'text.secondary' }}>
                  No news articles found.
                </Typography>
                <Button href={ROUTES.news} variant="outlined" sx={{ mt: 3 }}>
                  View all news
                </Button>
              </Box>
            )
          )}

          {(result.hasPrevPage || result.hasNextPage) && (
            <Row mainAxisAlignment="center" gap={1.5} mt={6}>
              {result.hasPrevPage && (
                <Button
                  href={pageHref(category, result.page - 1)}
                  variant="outlined"
                  sx={{ borderColor: 'primary.dark', color: 'primary.dark' }}
                >
                  Previous
                </Button>
              )}
              <Typography
                component="span"
                sx={{
                  alignSelf: 'center',
                  fontSize: 13,
                  color: 'text.secondary',
                }}
              >
                Page {result.page} of {result.totalPages}
              </Typography>
              {result.hasNextPage && (
                <Button
                  href={pageHref(category, result.page + 1)}
                  variant="contained"
                  sx={{
                    bgcolor: 'primary.dark',
                    '&:hover': { bgcolor: 'primary.main' },
                  }}
                >
                  Next
                </Button>
              )}
            </Row>
          )}
        </ContentBox>
      </Box>
    </React.Fragment>
  );
}

function pageHref(category: string | null | undefined, page: number) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `${ROUTES.news}?${query}` : ROUTES.news;
}

function FilterChip({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'true' : undefined}
      sx={{
        fontSize: 12.5,
        fontWeight: 600,
        color: active ? 'common.white' : 'brand.navInk',
        bgcolor: active ? 'primary.dark' : 'background.paper',
        border: '1.5px solid',
        borderColor: active ? 'primary.dark' : 'divider',
        borderRadius: '20px',
        px: 1.875,
        py: 1,
        whiteSpace: 'nowrap',
        transition: 'border-color .15s, color .15s',
        '&:hover': active
          ? {}
          : { borderColor: 'primary.main', color: 'primary.main' },
      }}
    >
      {label}
    </Link>
  );
}

function Featured({ article }: { article: NewsArticle }) {
  const href = getCollectionPath('news-articles', article.slug);

  return (
    <CssGrid
      columnTemplate={{ xs: '1fr', md: '1.1fr 1fr' }}
      spacing={{ xs: 3, md: 5.5 }}
      alignItems="center"
      sx={{
        mb: { xs: 6, md: 8 },
        pb: { xs: 6, md: 8 },
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Link href={href} sx={{ display: 'block' }}>
        <ArticleThumb article={article} ratio="4 / 3" radius="14px" />
      </Link>
      <Box>
        <CategoryChip category={article.category} />
        <Box
          component="time"
          dateTime={article.publishedDate}
          sx={{
            display: 'block',
            fontSize: 12,
            color: 'text.secondary',
            mt: 1.25,
          }}
        >
          {formatDate(article.publishedDate, 'D MMMM YYYY')}
        </Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: fonts.serif,
            fontSize: { xs: 24, md: 30 },
            color: 'primary.dark',
            lineHeight: 1.2,
            mt: 1.25,
          }}
        >
          <Link href={href} sx={{ '&:hover': { color: 'primary.main' } }}>
            {article.title}
          </Link>
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            color: 'text.secondary',
            lineHeight: 1.7,
            mt: 1.75,
            maxWidth: 480,
          }}
        >
          {article.excerpt}
        </Typography>
        <Button
          href={href}
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
        >
          Read more
        </Button>
      </Box>
    </CssGrid>
  );
}

export default NewsList;
