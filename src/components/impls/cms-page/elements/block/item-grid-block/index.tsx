import { Box, Theme, Typography } from '@mui/material';
import CssGrid from '~/components/shared/css-grid';
import Link from '~/components/shared/link';
import getActionHref from '~/helpers/get-action-href';
import { fonts } from '~/theme/tokens';
import { BlockDef } from '~/types';
import IconBox from '../../icon-box';
import SectionHeading from '../../section-heading';
import SectionWrapper, { useSectionPalette } from '../../section-wrapper';

type ItemGridBlockProps = {
  block: BlockDef<'item-grid-block'>;
};

type Item = ItemGridBlockProps['block']['items'][number];

/**
 * Icon/title/description cards in three casa-web flavours:
 * `tasks` (compact row under the hero), `cards` (pathway cards), `plain`.
 */
function ItemGridBlock({ block }: ItemGridBlockProps) {
  const variant = block.variant ?? 'cards';
  const columns = Number(block.columns ?? 3) || 3;
  const items = block.items ?? [];

  if (!items.length) return null;

  if (variant === 'tasks') {
    return <TasksRow block={block} columns={columns} />;
  }

  return (
    <SectionWrapper section={block.section} id={block.blockName}>
      <SectionHeading
        eyebrow={block.eyebrow}
        heading={block.heading}
        intro={block.intro}
      />
      <CssGrid
        columns={{ xs: 1, sm: Math.min(columns, 2), md: columns }}
        spacing={3}
      >
        {items.map((item, index) =>
          variant === 'cards' ? (
            <PathCard key={item.id ?? index} item={item} />
          ) : (
            <PlainItem key={item.id ?? index} item={item} />
          )
        )}
      </CssGrid>
    </SectionWrapper>
  );
}

function itemHref(item: Item) {
  return item.action?.enabled && item.action.value
    ? getActionHref(item.action.value)
    : undefined;
}

function linkProps(item: Item) {
  const href = itemHref(item);
  if (!href) return { component: 'div' as const };
  return {
    component: Link,
    href,
    target: item.action?.value?.newTab ? '_blank' : undefined,
  };
}

type TasksRowProps = ItemGridBlockProps & { columns: number };

function TasksRow({ block, columns }: TasksRowProps) {
  const palette = useSectionPalette();

  return (
    <SectionWrapper
      section={{ theme: block.section?.theme ?? 'paper', spacing: 'none' }}
      id={block.blockName}
      sx={{ borderBottom: 1, borderColor: 'divider' }}
      contentProps={{ sx: { px: { xs: 0, sm: 0 } } }}
    >
      <CssGrid columns={{ xs: 1, sm: 2, md: columns }} spacing={0}>
        {block.items.map((item, index) => (
          <Box
            key={item.id ?? index}
            {...(linkProps(item) as any)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.75,
              px: { xs: 2.5, md: 2.75 },
              py: { xs: 2.75, md: 3.5 },
              borderColor: 'divider',
              borderStyle: 'solid',
              borderWidth: 0,
              borderRightWidth: { xs: 0, md: 1 },
              borderBottomWidth: { xs: 1, md: 0 },
              transition: 'background-color .15s',
              '&:last-of-type': { borderRightWidth: 0, borderBottomWidth: 0 },
              '&:hover': {
                bgcolor: 'brand.cream',
                '& .nhc-icon-box': {
                  bgcolor: 'primary.main',
                  color: 'common.white',
                },
              },
            }}
          >
            <IconBox icon={item.icon} size={48} radius="12px" />
            <Box>
              <Typography
                component="span"
                display="block"
                sx={{
                  fontFamily: fonts.serif,
                  fontSize: 16.5,
                  color: palette.heading,
                  lineHeight: 1.15,
                }}
              >
                {item.title}
              </Typography>
              {item.description && (
                <Typography
                  component="span"
                  display="block"
                  sx={{ fontSize: 12.5, color: palette.muted, mt: 0.125 }}
                >
                  {item.description}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </CssGrid>
    </SectionWrapper>
  );
}

function PathCard({ item }: { item: Item }) {
  const palette = useSectionPalette();
  const cta = item.action?.enabled ? item.action.value?.label : undefined;

  return (
    <Box
      {...(linkProps(item) as any)}
      sx={{
        display: 'block',
        border: 1,
        borderColor: 'divider',
        borderRadius: '18px',
        p: { xs: '28px 24px', md: '36px 32px' },
        bgcolor: palette.card,
        color: palette.fg,
        transition: 'border-color .18s, box-shadow .18s, transform .18s',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: (theme: Theme) => theme.palette.customShadows.card,
          transform: 'translateY(-3px)',
          '& .nhc-go::after': { ml: '3px' },
        },
      }}
    >
      <IconBox icon={item.icon} size={52} radius="14px" sx={{ mb: 2.75 }} />
      <Typography
        variant="h3"
        component="h3"
        sx={{ color: palette.heading, mb: 1 }}
      >
        {item.title}
      </Typography>
      {item.description && (
        <Typography
          sx={{
            fontSize: 14,
            color: palette.muted,
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
          }}
        >
          {item.description}
        </Typography>
      )}
      {cta && (
        <Typography
          component="span"
          className="nhc-go"
          sx={{
            display: 'inline-block',
            mt: 2.5,
            fontSize: 14,
            fontWeight: 600,
            color: 'primary.main',
            py: 0.5,
            '&::after': { content: '" →"', transition: 'margin-left .15s' },
          }}
        >
          {cta}
        </Typography>
      )}
    </Box>
  );
}

function PlainItem({ item }: { item: Item }) {
  const palette = useSectionPalette();

  return (
    <Box
      {...(linkProps(item) as any)}
      sx={{ display: 'block', color: palette.fg }}
    >
      <IconBox icon={item.icon} size={44} radius="12px" sx={{ mb: 1.75 }} />
      <Typography
        variant="h4"
        component="h3"
        sx={{ color: palette.heading, mb: 0.75 }}
      >
        {item.title}
      </Typography>
      {item.description && (
        <Typography
          sx={{
            fontSize: 14,
            color: palette.muted,
            lineHeight: 1.6,
            whiteSpace: 'pre-line',
          }}
        >
          {item.description}
        </Typography>
      )}
    </Box>
  );
}

export default ItemGridBlock;
