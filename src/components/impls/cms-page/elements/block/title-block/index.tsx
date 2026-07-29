import PageBreadcrumbs from '~/components/generics/page-breadcrumbs';
import { Column, Spacer } from '~/components/shared/layout';
import { BlockDef } from '~/types';
import ActionField from '../../field/action-field';
import RichTextField from '../../field/rich-text-field';

type TitleBlockProps = {
  block: BlockDef<'title-block'>;
};

function TitleBlock({ block }: TitleBlockProps) {
  return (
    <Column crossAxisAlignment={block.centered ? 'center' : 'start'} gap={3}>
      {block.showBreadcrumb && <PageBreadcrumbs />}
      {block.expanded && <Spacer sy={3} />}
      <RichTextField
        value={block.title as any}
        textAlign={block.centered ? 'center' : undefined}
        maxWidth={540}
        mx={block.centered ? 'auto' : undefined}
      />
      {block.action?.enabled && <ActionField action={block.action.value} />}
    </Column>
  );
}

export default TitleBlock;
