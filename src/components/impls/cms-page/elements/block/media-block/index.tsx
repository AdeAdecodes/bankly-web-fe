import { BlockDef } from '~/types';
import MediaField from '../../field/media-field';

type MediaBlockProps = {
  block: BlockDef<'media-block'>;
};

function MediaBlock({ block }: MediaBlockProps) {
  return (
    <MediaField
      media={block.media}
      width={1}
      fit="contain"
      position={block.centered ? 'centered' : 'left'}
    />
  );
}

export default MediaBlock;
