import { Box, Button, Typography } from '@mui/material';
import { NEWS_CATEGORY_LABELS, ROUTES } from '~/constants';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import { getCollectionPath } from '~/helpers/get-action-href';
import { NewsArticle, PopulatedBlockDef } from '~/types';
import { formatDate } from '~/utils/date';
import SectionHeading from '../../section-heading';
import SectionWrapper, { useSectionPalette } from '../../section-wrapper';

type NewsGridBlockProps = {
  block: PopulatedBlockDef<'news-grid'>;
};

/** Latest news list (casa-web `.latest-band`), populated server-side. */
function NewsGridBlock({ block }: NewsGridBlockProps) {
  const articles = block.populatedData?.articles ?? [];

  return (
    <SectionWrapper
      section={{
        theme: block.section?.theme ?? 'cream',
        spacing: block.section?.spacing,
      }}
      id={block.blockName}
    >
      <SectionHeading
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro}
      />
      <Box maxWidth={820} mx="auto">
        {articles.map((article) => (
          <NewsRow key={article.id} article={article} />
        ))}
        {!articles.length && <EmptyState />}
      </Box>
      {block.showViewAll !== false && (
        <Row mainAxisAlignment="center" mt={4} gap={1.5} flexWrap="wrap">
          <Button
            href={ROUTES.news}
            variant="contained"
            sx={{
              bgcolor: 'primary.dark',
              '&:hover': { bgcolor: 'primary.main' },
            }}
          >
            {block.viewAllLabel || 'All news & notices'}
          </Button>
        </Row>
      )}
    </SectionWrapper>
  );
}

function NewsRow({ article }: { article: NewsArticle }) {
  const palette = useSectionPalette();

  return (
    <Box
      component={Link}
      href={getCollectionPath('news-articles', article.slug)}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 0.75, md: 3.5 },
        alignItems: { md: 'baseline' },
        py: 3.25,
        px: 1,
        borderBottom: 1,
        borderColor: palette.line,
        color: palette.fg,
        '&:last-of-type': { borderBottom: 0 },
        '&:hover h3': { color: 'primary.main' },
      }}
    >
      <Box
        component="time"
        dateTime={article.publishedDate}
        sx={{
          flex: 'none',
          width: { md: 92 },
          fontSize: 12.5,
          color: 'secondary.dark',
          fontWeight: 700,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        {formatDate(article.publishedDate, 'D MMM YYYY')}
      </Box>
      <Box>
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'secondary.dark',
            bgcolor: 'brand.chip',
            borderRadius: '5px',
            px: 1.125,
            py: 0.375,
            mb: 1,
          }}
        >
          {NEWS_CATEGORY_LABELS[article.category] ?? article.category}
        </Box>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontSize: 19,
            color: palette.heading,
            lineHeight: 1.3,
            transition: 'color .15s',
          }}
        >
          {article.title}
        </Typography>
        {article.excerpt && (
          <Typography sx={{ fontSize: 13.5, color: palette.muted, mt: 0.625 }}>
            {article.excerpt}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

function EmptyState() {
  const palette = useSectionPalette();
  return (
    <Typography textAlign="center" sx={{ color: palette.muted, py: 3 }}>
      No news published yet.
    </Typography>
  );
}

export default NewsGridBlock;
