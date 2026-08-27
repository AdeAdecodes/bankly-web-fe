import { alpha, Box, Typography, useTheme } from '@mui/material';
import CssGrid from '~/components/shared/css-grid';
import { fonts } from '~/theme/tokens';
import { BlockDef } from '~/types';
import SectionHeading from '../../section-heading';
import SectionWrapper, { useSectionPalette } from '../../section-wrapper';

type StatsSectionBlockProps = {
  block: BlockDef<'stats-section'>;
};

/**
 * Stat counters. `glance` = the deep-green "Nigeria & Australia at a glance"
 * band; `impact` = counters on a light background with testimonial quotes.
 */
function StatsSectionBlock({ block }: StatsSectionBlockProps) {
  const theme = useTheme();
  const variant = block.variant ?? 'glance';
  const themeKey =
    block.section?.theme ?? (variant === 'glance' ? 'deep' : 'paper');
  const isDeep = themeKey === 'deep';
  const stats = block.stats ?? [];
  const quotes = block.quotes ?? [];

  return (
    <SectionWrapper
      section={{ theme: themeKey, spacing: block.section?.spacing }}
      id={block.blockName}
      sx={
        isDeep
          ? {
              '&::after': {
                content: '""',
                position: 'absolute',
                right: -80,
                top: -80,
                width: 320,
                height: 320,
                background: theme.palette.gradients.goldGlow,
                pointerEvents: 'none',
              },
            }
          : undefined
      }
    >
      <SectionHeading
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro}
        mb={{ xs: 3.75, md: variant === 'glance' ? 3.75 : 6 }}
        headingSx={
          variant === 'glance' ? { fontSize: { xs: 24, md: 26 } } : undefined
        }
      />
      <Stats
        stats={stats}
        showDividers={isDeep}
        hasQuotes={quotes.length > 0}
      />
      {quotes.length > 0 && <Quotes quotes={quotes} isDeep={isDeep} />}
    </SectionWrapper>
  );
}

type StatsProps = {
  stats: StatsSectionBlockProps['block']['stats'];
  showDividers: boolean;
  hasQuotes: boolean;
};

function Stats({ stats, showDividers, hasQuotes }: StatsProps) {
  const palette = useSectionPalette();

  return (
    <CssGrid
      columns={{ xs: 2, md: Math.min(Math.max(stats.length, 1), 4) }}
      spacing={{ xs: 3.25, md: 2.75 }}
      mb={hasQuotes ? 5.25 : 0}
    >
      {stats.map((stat, index) => (
        <Box
          key={stat.id ?? index}
          textAlign="center"
          px={1.25}
          sx={{
            borderLeft: {
              xs: 0,
              md: showDividers && index > 0 ? `1px solid ${palette.line}` : 0,
            },
          }}
        >
          <Typography
            component="b"
            display="block"
            sx={{
              fontFamily: fonts.serif,
              fontSize: { xs: 30, md: 34 },
              lineHeight: 1,
              color: palette.accent,
              fontWeight: 400,
            }}
          >
            {stat.value}
          </Typography>
          <Typography
            component="span"
            display="block"
            sx={{
              fontSize: 13,
              color: palette.muted,
              mt: 1.125,
              lineHeight: 1.4,
            }}
          >
            {stat.label}
          </Typography>
        </Box>
      ))}
    </CssGrid>
  );
}

type QuotesProps = {
  quotes: NonNullable<StatsSectionBlockProps['block']['quotes']>;
  isDeep: boolean;
};

function Quotes({ quotes, isDeep }: QuotesProps) {
  const theme = useTheme();
  const palette = useSectionPalette();

  return (
    <CssGrid columns={{ xs: 1, md: Math.min(quotes.length, 2) }} spacing={2.75}>
      {quotes.map((quote, index) => (
        <Box
          key={quote.id ?? index}
          component="figure"
          sx={{
            m: 0,
            bgcolor: isDeep
              ? alpha(theme.palette.common.white, 0.06)
              : 'brand.cream',
            borderRadius: '16px',
            p: '26px 30px 28px',
            border: 1,
            borderColor: palette.line,
          }}
        >
          <Typography
            component="span"
            aria-hidden
            sx={{
              display: 'block',
              color: 'secondary.main',
              fontFamily: fonts.serif,
              fontSize: 44,
              lineHeight: 0,
              height: 22,
            }}
          >
            “
          </Typography>
          <Typography
            component="p"
            sx={{
              fontFamily: fonts.serif,
              fontSize: 16.5,
              color: palette.heading,
              lineHeight: 1.5,
              fontStyle: 'italic',
            }}
          >
            {quote.quote}
          </Typography>
          {quote.attribution && (
            <Typography
              component="figcaption"
              sx={{
                mt: 1.75,
                fontSize: 12.5,
                color: palette.muted,
                fontWeight: 600,
                letterSpacing: '0.02em',
              }}
            >
              — {quote.attribution}
            </Typography>
          )}
        </Box>
      ))}
    </CssGrid>
  );
}

export default StatsSectionBlock;
