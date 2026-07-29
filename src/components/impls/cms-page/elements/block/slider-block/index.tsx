import { BlockDef } from '~/types';
import AgentStorySliderBlock from './agent-story-slider-block';
import MediaSliderBlock from './media-slider-block';

type SliderBlockProps = {
  block: BlockDef<'slider-block'>;
};

function SliderBlock({ block }: SliderBlockProps) {
  const Component = sliderTypeToComponentMap[block.type];

  return <Component block={block} />;
}

type SliderType = SliderBlockProps['block']['type'];

const sliderTypeToComponentMap: Record<
  SliderType,
  React.ComponentType<{ block: any }>
> = {
  agent: AgentStorySliderBlock,
  media: MediaSliderBlock,
};

export default SliderBlock;
