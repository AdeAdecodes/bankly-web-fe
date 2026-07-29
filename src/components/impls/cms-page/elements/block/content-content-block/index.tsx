import React from 'react';
import CssGrid from '~/components/shared/css-grid';
import { BlockDef } from '~/types';
import RichTextField from '../../field/rich-text-field';

type ContentContentBlockProps = {
  block: BlockDef<'content-content-block'>;
};

function ContentContentBlock({ block }: ContentContentBlockProps) {
  const columnTemplate = React.useMemo(() => {
    let content1Size = '1fr';
    let content2Size = '1fr';

    if (block.emphasis === 'content1') {
      content1Size = '1.5fr';
    } else if (block.emphasis === 'content2') {
      content2Size = '1.5fr';
    }

    return {
      xs: '1fr',
      sm: `${content1Size} ${content2Size}`,
    };
  }, [block.emphasis]);

  return (
    <CssGrid columnTemplate={columnTemplate} spacing={6}>
      <RichTextField value={block.content1! as any} />
      <RichTextField value={block.content2! as any} />
    </CssGrid>
  );
}

export default ContentContentBlock;
