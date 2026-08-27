import { Box, Typography, useTheme } from '@mui/material';
import { NEWS_CATEGORY_LABELS } from '~/constants';
import Link from '~/components/shared/link';
import { getCollectionPath } from '~/helpers/get-action-href';
import { getMediaAlt, getMediaUrl } from '~/helpers/media';
import { fonts } from '~/theme/tokens';
import { NewsArticle } from '~/types';
import { formatDate } from '~/utils/date';

export function CategoryChip({
  category,
}: {
  category: NewsArticle['category'];
}) {
  return (
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
      }}
    >
      {NEWS_CATEGORY_LABELS[category] ?? category}
    </Box>
  );
}

type ThumbProps = { article: NewsArticle; ratio?: string; radius?: string };

/** Cover image with the coat-of-arms-free cream fallback. */
export function ArticleThumb({
  article,
  ratio = '16 / 10',
  radius = 0 as unknown as string,
}: ThumbProps) {
  const src = getMediaUrl(article.coverImage);

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: ratio,
        overflow: 'hidden',
        bgcolor: 'brand.cream',
        borderRadius: radius,
      }}
    >
      {src && (
        <Box
          component="img"
          src={src}
          alt={getMediaAlt(article.coverImage, article.title)}
          loading="lazy"
          sx={{ width: 1, height: 1, objectFit: 'cover', display: 'block' }}
        />
      )}
    </Box>
  );
}

/** News listing card (casa-web `.nw-card`). */
function ArticleCard({ article }: { article: NewsArticle }) {
  const theme = useTheme();

  return (
    <Box
      component={Link}
      href={getCollectionPath('news-articles', article.slug)}
      sx={{
        display: 'block',
        border: 1,
        borderColor: 'divider',
        borderRadius: '12px',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        color: 'text.primary',
        transition: 'border-color .18s, box-shadow .18s, transform .18s',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: theme.palette.customShadows.card,
          transform: 'translateY(-3px)',
          '& h3': { color: 'primary.main' },
        },
      }}
    >
      <ArticleThumb article={article} />
      <Box sx={{ p: '20px 20px 22px' }}>
        <CategoryChip category={article.category} />
        <Box
          component="time"
          dateTime={article.publishedDate}
          sx={{
            display: 'block',
            fontSize: 12,
            color: 'text.secondary',
            mt: 1,
          }}
        >
          {formatDate(article.publishedDate, 'D MMMM YYYY')}
        </Box>
        <Typography
          component="h3"
          sx={{
            fontFamily: fonts.serif,
            fontSize: 17.5,
            color: 'primary.dark',
            lineHeight: 1.3,
            mt: 1.25,
            transition: 'color .15s',
          }}
        >
          {article.title}
        </Typography>
        <Typography
          component="span"
          sx={{
            display: 'inline-block',
            mt: 1.75,
            fontSize: 13,
            fontWeight: 600,
            color: 'primary.main',
          }}
        >
          Read more →
        </Typography>
      </Box>
    </Box>
  );
}

export default ArticleCard;
