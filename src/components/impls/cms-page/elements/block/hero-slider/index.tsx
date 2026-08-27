import { alpha, Box, NoSsr, Typography, useTheme } from '@mui/material';
import React from 'react';
import { A11y, Autoplay, EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ContentBox from '~/components/generics/content-box';
import { Row } from '~/components/shared/layout';
import Link from '~/components/shared/link';
import getActionHref from '~/helpers/get-action-href';
import { asMedia, getMediaUrl, isVideoMedia } from '~/helpers/media';
import { BlockDef } from '~/types';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

type HeroSliderBlockProps = {
  block: BlockDef<'hero-slider'>;
};

type Slide = HeroSliderBlockProps['block']['slides'][number];

/**
 * Homepage hero: cross-fading image/video slides behind a fixed heading and
 * "popular" quick links (casa-web `.hero`). The search box is intentionally
 * omitted (no search backend yet).
 */
function HeroSliderBlock({ block }: HeroSliderBlockProps) {
  const theme = useTheme();
  const [active, setActive] = React.useState(0);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    setReduceMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const slides = block.slides ?? [];
  const interval = block.autoplayInterval ?? 6000;
  const canSlide = slides.length > 1;
  const autoplay =
    canSlide && interval > 0 && !reduceMotion
      ? {
          delay: interval,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }
      : false;
  const activeSlide = slides[active];
  const quickLinks = block.quickLinks ?? [];

  return (
    <Box
      component="section"
      id={block.blockName || 'hero'}
      sx={{
        position: 'relative',
        bgcolor: 'brand.deepest',
        color: 'common.white',
        overflow: 'hidden',
        '& .hero-swiper': { position: 'absolute', inset: 0, zIndex: 1 },
        '& .swiper-wrapper, & .swiper-slide': { height: '100%' },
        '& .swiper-pagination': {
          bottom: 16,
          display: 'flex',
          justifyContent: 'center',
          gap: '4px',
          zIndex: 6,
        },
        '& .swiper-pagination-bullet': {
          width: 34,
          height: 4,
          borderRadius: '4px',
          bgcolor: alpha(theme.palette.common.white, 0.4),
          opacity: 1,
          m: '0 !important',
          transition: 'background-color .3s',
        },
        '& .swiper-pagination-bullet-active': { bgcolor: 'secondary.main' },
      }}
    >
      <NoSsr fallback={<SlideMedia slide={slides[0]} reduceMotion />}>
        <Swiper
          className="hero-swiper"
          modules={[Autoplay, EffectFade, Pagination, A11y]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1100}
          loop={canSlide}
          autoplay={autoplay}
          allowTouchMove={canSlide}
          pagination={canSlide ? { clickable: true } : false}
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id ?? index}>
              <SlideMedia slide={slide} reduceMotion={reduceMotion} />
            </SwiperSlide>
          ))}
        </Swiper>
      </NoSsr>

      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background: theme.palette.gradients.heroOverlay,
        }}
      />

      {activeSlide && isVideoMedia(activeSlide.media) && (
        <Row
          crossAxisAlignment="center"
          gap={0.875}
          sx={{
            position: 'absolute',
            top: 18,
            right: 22,
            zIndex: 6,
            bgcolor: alpha(theme.palette.common.black, 0.35),
            border: `1px solid ${alpha(theme.palette.common.white, 0.3)}`,
            fontSize: 11.5,
            px: 1.5,
            py: 0.75,
            borderRadius: '20px',
            pointerEvents: 'none',
          }}
        >
          <PlayDot />
          Video{activeSlide.caption ? ` · ${activeSlide.caption}` : ''}
        </Row>
      )}

      <ContentBox
        sx={{
          position: 'relative',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: { xs: 470, sm: 520, md: 580 },
          pt: { xs: 7.25, sm: 8.75, md: 10.5 },
          pb: { xs: 12.5, md: 13.75 },
        }}
      >
        {block.eyebrow && (
          <Typography variant="eyebrow" color="secondary.light" mb={2.25}>
            {block.eyebrow}
          </Typography>
        )}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 28, sm: 33, md: 44 },
            maxWidth: 820,
            textShadow: theme.palette.customShadows.heroText,
          }}
        >
          {block.heading}
          {block.headingAccent && (
            <React.Fragment>
              {' '}
              <Box
                component="em"
                sx={{ color: 'secondary.light', fontStyle: 'italic' }}
              >
                {block.headingAccent}
              </Box>
            </React.Fragment>
          )}
        </Typography>
        {block.subheading && (
          <Typography
            sx={{
              color: 'brand.heroText',
              fontSize: { xs: 15.5, md: 17 },
              mt: 2,
              maxWidth: 560,
              textShadow: theme.palette.customShadows.heroTagline,
            }}
          >
            {block.subheading}
          </Typography>
        )}
        {quickLinks.length > 0 && (
          <Row
            flexWrap="wrap"
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            gap={1.125}
            mt={3.5}
          >
            <Typography
              component="span"
              sx={{ color: 'brand.mintText', fontSize: 13, mr: 0.25 }}
            >
              Popular:
            </Typography>
            {quickLinks.map((quickLink, index) => (
              <Link
                key={quickLink.id ?? index}
                href={getActionHref(quickLink.action, '#')}
                target={quickLink.action?.newTab ? '_blank' : undefined}
                sx={{
                  color: 'common.white',
                  fontSize: 13,
                  border: `1px solid ${alpha(
                    theme.palette.common.white,
                    0.45
                  )}`,
                  bgcolor: alpha(theme.palette.brand.deepest, 0.25),
                  px: 2,
                  py: 1.125,
                  borderRadius: '22px',
                  minHeight: 38,
                  display: 'inline-flex',
                  alignItems: 'center',
                  transition: 'background-color .15s',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.common.white, 0.16),
                  },
                }}
              >
                {quickLink.label}
              </Link>
            ))}
          </Row>
        )}
      </ContentBox>
    </Box>
  );
}

type SlideMediaProps = {
  slide?: Slide;
  reduceMotion: boolean;
};

function SlideMedia({ slide, reduceMotion }: SlideMediaProps) {
  const media = asMedia(slide?.media);

  if (!slide || !media?.url) {
    return <Box sx={{ position: 'absolute', inset: 0 }} />;
  }

  if (isVideoMedia(media)) {
    return (
      <Box
        component="video"
        autoPlay={!reduceMotion}
        muted
        loop
        playsInline
        preload="metadata"
        poster={getMediaUrl(slide.poster)}
        aria-label={slide.caption || media.alt}
        sx={{
          position: 'absolute',
          inset: 0,
          width: 1,
          height: 1,
          objectFit: 'cover',
          filter: 'saturate(1.2) contrast(1.05)',
        }}
      >
        <source src={media.url} type={media.mimeType || 'video/mp4'} />
      </Box>
    );
  }

  return (
    <Box
      role="img"
      aria-label={slide.caption || media.alt}
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${media.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'saturate(1.2) contrast(1.05)',
        animation: reduceMotion
          ? 'none'
          : 'nhc-kenburns 16s ease-in-out infinite alternate',
        '@keyframes nhc-kenburns': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.07) translate(-1.2%, -0.8%)' },
        },
      }}
    />
  );
}

function PlayDot() {
  return (
    <Box
      component="span"
      aria-hidden
      sx={{
        width: 15,
        height: 15,
        borderRadius: '50%',
        bgcolor: 'secondary.main',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&::after': {
          content: '""',
          borderLeft: '5px solid',
          borderLeftColor: 'brand.deepest',
          borderTop: '3.5px solid transparent',
          borderBottom: '3.5px solid transparent',
          ml: '1px',
        },
      }}
    />
  );
}

export default HeroSliderBlock;
