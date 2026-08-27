import { alpha, Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useInView } from 'react-hook-inview';
import CssGrid from '~/components/shared/css-grid';
import { Row } from '~/components/shared/layout';
import { asMedia, getMediaUrl } from '~/helpers/media';
import { fonts } from '~/theme/tokens';
import { BlockDef } from '~/types';
import SectionHeading from '../../section-heading';
import SectionWrapper from '../../section-wrapper';

type VideoGalleryBlockProps = {
  block: BlockDef<'video-gallery'>;
};

type Video = VideoGalleryBlockProps['block']['videos'][number];

/** "Nigeria in motion" — looping clips that play only while on screen. */
function VideoGalleryBlock({ block }: VideoGalleryBlockProps) {
  const videos = block.videos ?? [];

  if (!videos.length) return null;

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
      <CssGrid
        columns={{ xs: 1, sm: 2, md: Math.min(videos.length, 4) }}
        spacing={2.25}
      >
        {videos.map((video, index) => (
          <VideoCard key={video.id ?? index} video={video} />
        ))}
      </CssGrid>
    </SectionWrapper>
  );
}

function VideoCard({ video }: { video: Video }) {
  const theme = useTheme();
  const [inViewRef, inView] = useInView({ threshold: 0.25 });
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const src = asMedia(video.video)?.url;
  const poster = getMediaUrl(video.poster);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el || !src) return;

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (inView && !reduce) {
      if (!el.getAttribute('src')) {
        el.setAttribute('src', src);
        el.load();
      }
      el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  }, [inView, src]);

  return (
    <Box
      component="figure"
      ref={inViewRef}
      sx={{
        m: 0,
        position: 'relative',
        borderRadius: '18px',
        overflow: 'hidden',
        aspectRatio: { xs: '16 / 11', sm: '4 / 5' },
        maxWidth: { xs: 460, sm: 'none' },
        width: 1,
        mx: 'auto',
        bgcolor: 'brand.deepest',
        backgroundImage: poster ? `url(${poster})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: theme.palette.customShadows.cardStrong,
        transition: 'transform .18s',
        '&:hover': { transform: 'translateY(-3px)' },
      }}
    >
      <Box
        component="video"
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-label={video.title}
        sx={{
          position: 'absolute',
          inset: 0,
          width: 1,
          height: 1,
          objectFit: 'cover',
          display: 'block',
          filter: 'saturate(1.15) contrast(1.03)',
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: theme.palette.gradients.cardFade,
        }}
      />
      <Row
        crossAxisAlignment="center"
        gap={0.875}
        sx={{
          position: 'absolute',
          top: 14,
          right: 14,
          zIndex: 2,
          bgcolor: alpha(theme.palette.common.black, 0.42),
          border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
          color: 'common.white',
          fontSize: 11,
          px: 1.375,
          py: 0.625,
          borderRadius: '20px',
        }}
      >
        <Box
          component="span"
          aria-hidden
          sx={{
            width: 13,
            height: 13,
            borderRadius: '50%',
            bgcolor: 'secondary.main',
          }}
        />
        Video
      </Row>
      <Box
        component="figcaption"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          p: '24px 22px',
          color: 'common.white',
        }}
      >
        {video.tag && (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              fontSize: 10.5,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: 'brand.deepest',
              bgcolor: 'secondary.main',
              px: 1.375,
              py: 0.5,
              borderRadius: '20px',
              mb: 1.375,
            }}
          >
            {video.tag}
          </Box>
        )}
        <Typography
          component="b"
          display="block"
          sx={{ fontFamily: fonts.serif, fontSize: 20, lineHeight: 1.2 }}
        >
          {video.title}
        </Typography>
        {video.description && (
          <Typography
            sx={{
              fontSize: 13,
              color: 'brand.mintText',
              mt: 0.75,
              lineHeight: 1.5,
            }}
          >
            {video.description}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default VideoGalleryBlock;
