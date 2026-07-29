import { Row } from '~/components/shared/layout';
import parseValue from '~/helpers/parse-value';
import { BlockDef } from '~/types';
import MediaField from '../../field/media-field';

type MediaSetBlockProps = {
  block: BlockDef<'media-set-block'>;
};

function MediaSetBlock({ block }: MediaSetBlockProps) {
  return (
    <Row
      gap={parseValue(block.gap)}
      crossAxisAlignment="center"
      mainAxisAlignment="center"
      flexWrap="wrap"
    >
      {block.medias?.map((media) => (
        <MediaField key={media.id} media={media.media} />
      ))}
    </Row>
  );
}

export default MediaSetBlock;
