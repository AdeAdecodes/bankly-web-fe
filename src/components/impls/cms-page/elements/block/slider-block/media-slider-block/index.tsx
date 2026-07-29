import { Box, IconButton, NoSsr } from '@mui/material';
import React from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import AspectRatio from '~/components/shared/aspect-ratio';
import { Column, Row } from '~/components/shared/layout';
import { BlockDef } from '~/types';
import MediaField from '../../../field/media-field';
import RichTextField from '../../../field/rich-text-field';
import ArrowLeftCircleOutline from './assets/arrow-left-circle-outline.svg';
import ArrowRightCircleOutline from './assets/arrow-right-circle-outline.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

type MediaSliderBlockProps = {
  block: BlockDef<'slider-block'>;
};

function MediaSliderBlock({ block }: MediaSliderBlockProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const swiperRef = React.useRef<SwiperRef | null>(null);
  const swiper = swiperRef.current?.swiper;

  return (
    <NoSsr>
      <Box
        sx={{
          '& .swiper': {
            overflow: 'unset',
            '--swiper-pagination-bottom': 0,
            '--swiper-pagination-bullet-size': '8px',
            '--swiper-pagination-bullet-horizontal-gap': '4px',
          },
          '& .swiper-slide': {
            width: { xs: 0.8, sm: 0.7 },
          },
        }}
      >
        <Row crossAxisAlignment="center" mainAxisAlignment="center">
          <IconButton
            onClick={() => swiper?.slidePrev()}
            disabled={activeIndex === 0}
            sx={{ color: 'primary.main' }}
            disableRipple
          >
            <Box
              component={ArrowLeftCircleOutline}
              width="1em"
              height="1em"
              fontSize="inherit"
            />
          </IconButton>
          <IconButton
            onClick={() => swiper?.slideNext()}
            disabled={activeIndex === block.medias.length - 1}
            sx={{ color: 'primary.main' }}
            disableRipple
          >
            <Box
              component={ArrowRightCircleOutline}
              width="1em"
              height="1em"
              fontSize="inherit"
            />
          </IconButton>
        </Row>
        <Swiper
          ref={swiperRef}
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          noSwiping={false}
          slidesOffsetAfter={120}
        >
          {block.medias.map((media) => (
            <SwiperSlide key={media.id}>
              <Column gap={2} pb={5}>
                <AspectRatio value={16 / 9} width={1} maxHeight={640}>
                  <MediaField
                    media={media.media}
                    fit="cover"
                    borderRadius={2}
                  />
                </AspectRatio>
                {media.label && (
                  <RichTextField
                    value={media.label as any}
                    textAlign="center"
                  />
                )}
              </Column>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </NoSsr>
  );
}

export default MediaSliderBlock;
