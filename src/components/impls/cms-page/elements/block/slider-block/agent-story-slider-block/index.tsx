import { Box, NoSsr, Typography } from '@mui/material';
import { EffectFade, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Column, FlexItem, Spacer } from '~/components/shared/layout';
import { Agent, BlockDef } from '~/types';
import MediaField from '../../../field/media-field';
import RichTextField from '../../../field/rich-text-field';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

type AgentStorySliderBlockProps = {
  block: BlockDef<'slider-block'>;
};

function AgentStorySliderBlock({ block }: AgentStorySliderBlockProps) {
  return (
    <NoSsr>
      <Box
        sx={{
          '& .swiper': {
            padding: '16px',
            '--swiper-pagination-bottom': 0,
            '--swiper-pagination-bullet-size': '12px',
            '--swiper-pagination-bullet-horizontal-gap': '4px',
          },
        }}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          modules={[Pagination, EffectFade]}
          noSwiping={false}
          fadeEffect={{ crossFade: true }}
          effect="fade"
        >
          {block.agents.map((agent) => (
            <SwiperSlide key={(agent as Agent).id}>
              <AgentStoryWidget agent={agent} />
              <Spacer sy={3} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </NoSsr>
  );
}

type AgentStory = BlockDef<'slider-block'>['agents'][number];
type AgentStoryWidgetProps = {
  agent: AgentStory;
};

function AgentStoryWidget({ agent }: AgentStoryWidgetProps) {
  if (typeof agent === 'string') return null;

  return (
    <FlexItem
      direction={{ xs: 'column-reverse', sm: 'row' }}
      gap={4}
      bgcolor="background.default"
      boxShadow="0px 0px 1px rgba(12, 26, 75, 0.1), 0px 10px 16px rgba(20, 37, 63, 0.06)"
    >
      <Column px={4} pt={{ xs: 3, sm: 5 }} pb={5} flex={1} gap={5}>
        <RichTextField value={agent.story as any} />
        <Column crossAxisAlignment="end">
          <Typography variant="h6">{agent.name}</Typography>
          <Typography variant="body2">{agent.location}</Typography>
        </Column>
      </Column>
      <Box
        position="relative"
        flex={1}
        width={1}
        maxWidth={{ xs: undefined, sm: 320 }}
        minHeight={240}
      >
        <MediaField
          type="bg"
          media={agent.photo}
          fit="cover"
          position="center"
          sx={{ zIndex: 0 }}
        />
      </Box>
    </FlexItem>
  );
}

export default AgentStorySliderBlock;
