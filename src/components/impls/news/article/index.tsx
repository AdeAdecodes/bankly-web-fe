import { Box, Typography } from '@mui/material';
import React from 'react';
import { ROUTES } from '~/constants';
import ContentBox from '~/components/generics/content-box';
import RichTextField from '~/components/impls/cms-page/elements/field/rich-text-field';
import SectionHeading from '~/components/impls/cms-page/elements/section-heading';
import SectionWrapper from '~/components/impls/cms-page/elements/section-wrapper';
import Breadcrumbs from '~/components/shared/breadcrumbs';
import CssGrid from '~/components/shared/css-grid';
import { Row } from '~/components/shared/layout';
import PageSEO from '~/components/shared/page-seo';
import config from '~/config';
import { getCollectionPath } from '~/helpers/get-action-href';
import { getMediaAlt, getMediaUrl } from '~/helpers/media';
import readingTime from '~/helpers/reading-time';
import { fonts } from '~/theme/tokens';
import { NewsArticle, SiteSetting } from '~/types';
import { formatDate } from '~/utils/date';
import ArticleCard, { CategoryChip } from '../article-card';

export type NewsArticlePageProps = {
  article: NewsArticle;
  related: NewsArticle[];
  settings?: SiteSetting;
};

/** Single news article (casa-web `news/<slug>/index.html`). */
function NewsArticlePage({ article, related, settings }: NewsArticlePageProps) {
  const cover = getMediaUrl(article.coverImage);
  const path = getCollectionPath('news-articles', article.slug);

  return (
    <React.Fragment>
      <PageSEO
        type="article"
        title={article.meta?.title || article.title}
        description={article.meta?.description || article.excerpt}
        image={getMediaUrl(article.meta?.image) || cover}
        url={config.site.url ? `${config.site.url}${path}` : undefined}
        settings={settings}
      />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'News', href: ROUTES.news },
          { label: article.title },
        ]}
      />

      <Box component="article">
        <ContentBox sx={{ pt: { xs: 5, md: 7 }, pb: 4, textAlign: 'center' }}>
          <Box maxWidth={820} mx="auto">
            <CategoryChip category={article.category} />
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 28, md: 38 },
                color: 'primary.dark',
                mt: 2,
                lineHeight: 1.15,
              }}
            >
              {article.title}
            </Typography>
            <Row
              mainAxisAlignment="center"
              crossAxisAlignment="center"
              gap={1.25}
              flexWrap="wrap"
              sx={{ mt: 2.5, fontSize: 13.5, color: 'text.secondary' }}
            >
              <time dateTime={article.publishedDate}>
                {formatDate(article.publishedDate, 'MMMM D, YYYY')}
              </time>
              {article.author && (
                <React.Fragment>
                  <span aria-hidden>·</span>
                  <span>{article.author}</span>
                </React.Fragment>
              )}
              <span aria-hidden>·</span>
              <span>{readingTime(article.body)}</span>
            </Row>
          </Box>
        </ContentBox>

        {cover && (
          <ContentBox sx={{ maxWidth: 960 }}>
            <Box
              component="img"
              src={cover}
              alt={getMediaAlt(article.coverImage, article.title)}
              sx={{
                width: 1,
                aspectRatio: '16 / 9',
                objectFit: 'cover',
                borderRadius: '14px',
                display: 'block',
              }}
            />
          </ContentBox>
        )}

        <ContentBox
          sx={{ maxWidth: 760, pt: { xs: 4, md: 6 }, pb: { xs: 7, md: 10 } }}
        >
          <RichTextField
            value={article.body}
            gap={2}
            sx={{
              '& p, & li': {
                fontSize: 16.5,
                lineHeight: 1.75,
                color: 'text.primary',
              },
              '& h2': {
                fontFamily: fonts.serif,
                fontSize: { xs: 22, md: 26 },
                color: 'primary.dark',
                mt: 2,
              },
              '& h3': {
                fontFamily: fonts.serif,
                fontSize: 20,
                color: 'primary.dark',
                mt: 1.5,
              },
              '& ul, & ol': { pl: 3, m: 0 },
              '& li': { mb: 0.75 },
              '& a': { color: 'primary.main', textDecoration: 'underline' },
            }}
          />
        </ContentBox>
      </Box>

      {related.length > 0 && (
        <SectionWrapper
          section={{ theme: 'cream', spacing: 'default' }}
          id="related"
        >
          <SectionHeading eyebrow="Related" heading="Related News" />
          <CssGrid
            columns={{ xs: 1, sm: 2, md: Math.min(related.length, 3) }}
            spacing={3.5}
          >
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </CssGrid>
        </SectionWrapper>
      )}
    </React.Fragment>
  );
}

export default NewsArticlePage;
