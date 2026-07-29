import { BlockDef } from '~/types';
import RichTextField from '../../field/rich-text-field';

type ContentBlockProps = {
  block: BlockDef<'content-block'>;
};

function ContentBlock({ block }: ContentBlockProps) {
  return <RichTextField value={block.content as any} />;
}

export default ContentBlock;
