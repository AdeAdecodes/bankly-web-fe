import { Box, Rating, Typography } from '@mui/material';
import React from 'react';
import { useInView } from 'react-hook-inview';
import CssGrid from '~/components/shared/css-grid';
import { Column, Row } from '~/components/shared/layout';
import { PopulatedBlockDef, Testimonial } from '~/types';
import { useScreenDependentValue } from '~/utils/use-mui-screen-dependent-value';
import MediaField from '../../field/media-field';
import RichTextField from '../../field/rich-text-field';

type TestimonialsBlockProps = {
  block: PopulatedBlockDef<'testimonials-block'>;
};

function TestimonialsBlock({ block }: TestimonialsBlockProps) {
  const [inViewElRef, isInView] = useInView();

  const elRef = React.useRef<HTMLDivElement | null>(null);
  const columnCount = useScreenDependentValue({ xs: 1, sm: 2, md: 3 });

  const columns = React.useMemo(() => {
    const testimonials = block.populatedData.testimonials;

    if (columnCount === 1) {
      return [testimonials];
    }

    const buckets = Array.from(
      { length: columnCount },
      () => [] as Testimonial[]
    );

    let currentItemIndex = 0;
    let currentBucketIndex = 0;

    while (currentItemIndex < testimonials.length) {
      buckets[currentBucketIndex].push(testimonials[currentItemIndex]);
      currentBucketIndex = (currentBucketIndex + 1) % columnCount;
      currentItemIndex++;
    }

    return buckets;
  }, [block.populatedData.testimonials, columnCount]);

  React.useEffect(() => {
    let timeoutId: any;

    const el = elRef.current;

    function doScroll() {
      if (!el || !isInView || el.scrollTop + el.clientHeight > el.scrollHeight)
        return;

      el.scrollBy({ top: 1 });
      timeoutId = setTimeout(doScroll, 10);
    }

    doScroll();

    function onMouseIn() {
      clearTimeout(timeoutId); // pause animation
    }

    function onMouseOut() {
      doScroll();
    }

    el?.addEventListener('mouseenter', onMouseIn);
    el?.addEventListener('mouseleave', onMouseOut);

    return () => {
      clearTimeout(timeoutId);
      el?.removeEventListener('mouseenter', onMouseIn);
      el?.removeEventListener('mouseleave', onMouseOut);
    };
  }, [isInView]);

  return (
    <Box ref={inViewElRef}>
      <Box
        ref={elRef}
        maxHeight="90vh"
        overflow="hidden auto"
        sx={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
            width: 0,
            height: 0,
          },
        }}
      >
        <CssGrid columns={columnCount} spacing={2} py={4}>
          {columns.map((column, columnIndex) => (
            <Column key={columnIndex} gap={2}>
              {column.map((testimonial, index) => (
                <TestimonialWidget
                  key={testimonial.id || index}
                  testimonial={testimonial}
                />
              ))}
            </Column>
          ))}
        </CssGrid>
      </Box>
    </Box>
  );
}

type TestimonialWidgetProps = {
  testimonial: Testimonial;
};

function TestimonialWidget({ testimonial }: TestimonialWidgetProps) {
  return (
    <Column
      p={2}
      borderRadius={2}
      boxShadow="0px 0px 1px rgba(12, 26, 75, 0.1), 0px 4px 20px -2px rgba(50, 50, 71, 0.08)"
      bgcolor="white"
      gap={2}
    >
      <Row crossAxisAlignment="center" gap={2}>
        <MediaField
          media={testimonial.photo}
          width={40}
          height={40}
          borderRadius="50%"
        />
        <Column>
          <Typography fontWeight={600}>{testimonial.name}</Typography>
          <Rating
            value={Number(testimonial.rating)}
            sx={{ fontSize: 14 }}
            readOnly
          />
        </Column>
      </Row>
      <RichTextField value={testimonial.content as any} sx={{ fontSize: 12 }} />
    </Column>
  );
}

export default TestimonialsBlock;
