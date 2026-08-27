import React from 'react';
import { Block } from '~/types';
import CMSBlock from '../elements/block';

type RenderBlocksProps = {
  blocks?: Block[] | null;
};

/** Renders a flat `layout` array of CMS blocks in order. */
function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks?.length) return null;

  return (
    <React.Fragment>
      {blocks.map((block, index) => (
        <CMSBlock
          key={block.id || `${block.blockType}-${index}`}
          block={block}
        />
      ))}
    </React.Fragment>
  );
}

export default RenderBlocks;
