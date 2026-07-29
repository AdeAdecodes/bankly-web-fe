import React from 'react';
import { BlockDef } from '~/types';
import CMSBlock from '..';

type ReusableContentBlockProps = {
  block: BlockDef<'reusable-content-block'>;
};

function ReusableContentBlock({ block }: ReusableContentBlockProps) {
  if (!block.reference || typeof block.reference == 'string') return null;

  return (
    <React.Fragment>
      {block.reference.definitions.map((block) => (
        <CMSBlock key={block.id} block={block} />
      ))}
    </React.Fragment>
  );
}

export default ReusableContentBlock;
