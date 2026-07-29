import { BlockDef } from '~/types';
import CMSBlock from '..';
import useIsTruthyConditions from '../../shared/use-is-truthy-conditions';

type ConditionalBlockProps = {
  block: BlockDef<'conditional-block'>;
};

function ConditionalBlock({ block }: ConditionalBlockProps) {
  const canRender = useIsTruthyConditions(block.conditions || []);

  if (canRender) {
    return <CMSBlock block={block.child[0]!} />;
  }

  return null;
}

export default ConditionalBlock;
