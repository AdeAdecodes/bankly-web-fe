import { Box, useTheme } from '@mui/material';
import ContentBox from '~/components/generics/content-box';
import CssGrid from '~/components/shared/css-grid';
import { asMedia, getMediaUrl, isVideoMedia } from '~/helpers/media';
import { BlockDef } from '~/types';
import ActionGroupField from '../../field/action-group-field';
import MediaField from '../../field/media-field';
import RichTextField from '../../field/rich-text-field';
import { RichTextNode } from '../../field/rich-text-field/types';
import { Eyebrow } from '../../section-heading';
import SectionWrapper, { useSectionPalette } from '../../section-wrapper';

type MediaContentBlockProps = {
  block: BlockDef<'media-content-block'>;
};

/**
 * Rich text + media. With `backgroundMedia` set it becomes a full-bleed band
 * with the media behind the copy (casa-web "Learn Nigeria"); otherwise a
 * two-column media/content split.
 */
function MediaContentBlock({ block }: MediaContentBlockProps) {
  return asMedia(block.backgroundMedia) ? (
    <BackgroundBand block={block} />
  ) : (
    <SplitLayout block={block} />
  );
}

/** Rich-text `label` nodes render as section kickers. */
const labelRenderer = {
  label: (node: RichTextNode) => (
    <Eyebrow key="label">
      {'children' in node
        ? node.children
            .map((child) => ('text' in child ? child.text : ''))
            .join('')
        : ''}
    </Eyebrow>
  ),
};

function BackgroundBand({ block }: MediaContentBlockProps) {
  const theme = useTheme();
  const media = asMedia(block.backgroundMedia)!;
  const video = isVideoMedia(media);

  return (
    <SectionWrapper
      section={{ theme: 'deep', spacing: 'none' }}
      id={block.blockName}
      boxed={false}
      sx={{ bgcolor: 'brand.deepest' }}
    >
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {video ? (
          <Box
            component="video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            sx={{
              position: 'absolute',
              inset: 0,
              width: 1,
              height: 1,
              objectFit: 'cover',
              filter: 'saturate(1.18) contrast(1.04)',
            }}
          >
            <source src={media.url} type={media.mimeType || 'video/mp4'} />
          </Box>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${media.url ?? ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'saturate(1.18) contrast(1.04)',
            }}
          />
        )}
      </Box>
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: theme.palette.gradients.bandOverlay,
        }}
      />
      <ContentBox
        sx={{ position: 'relative', zIndex: 2, py: { xs: 9, md: 12 } }}
      >
        <Box maxWidth={600}>
          <RichTextField
            value={block.content}
            renderers={labelRenderer}
            gap={1.5}
            sx={{
              '& h2': {
                fontSize: { xs: 26, sm: 31, md: 38 },
                color: 'common.white',
                textShadow: theme.palette.customShadows.heroText,
              },
              '& h2 em, & h3 em': { color: 'secondary.light' },
              '& p': { color: 'brand.heroText', fontSize: 15.5, maxWidth: 520 },
            }}
          />
          {!!block.actions?.length && (
            <ActionGroupField
              actions={block.actions}
              gap={1.75}
              mt={3.75}
              flexWrap="wrap"
            />
          )}
        </Box>
      </ContentBox>
    </SectionWrapper>
  );
}

function SplitLayout({ block }: MediaContentBlockProps) {
  const emphasis = block.emphasis ?? 'moderate';
  const mediaFirst = block.arrangement === 'media-first';
  const hasMedia = !!getMediaUrl(block.media?.ref);
  const template =
    emphasis === 'media'
      ? '3fr 2fr'
      : emphasis === 'content'
      ? '2fr 3fr'
      : '1fr 1fr';

  return (
    <SectionWrapper section={block.section} id={block.blockName}>
      <CssGrid
        columnTemplate={{ xs: '1fr', md: hasMedia ? template : '1fr' }}
        spacing={{ xs: 4, md: 8 }}
        alignItems="center"
      >
        {hasMedia && (
          <Box order={{ xs: 0, md: mediaFirst ? 0 : 1 }}>
            <MediaField
              media={block.media}
              width={1}
              fit="cover"
              sx={{ borderRadius: '18px', display: 'block' }}
            />
          </Box>
        )}
        <Content block={block} />
      </CssGrid>
    </SectionWrapper>
  );
}

function Content({ block }: MediaContentBlockProps) {
  const palette = useSectionPalette();

  return (
    <Box>
      <RichTextField
        value={block.content}
        renderers={labelRenderer}
        gap={1.75}
        sx={{
          '& h2, & h3, & h4': { color: palette.heading },
          '& p': { color: palette.fg },
        }}
      />
      {!!block.actions?.length && (
        <ActionGroupField
          actions={block.actions}
          gap={1.5}
          mt={3}
          flexWrap="wrap"
        />
      )}
    </Box>
  );
}

export default MediaContentBlock;
