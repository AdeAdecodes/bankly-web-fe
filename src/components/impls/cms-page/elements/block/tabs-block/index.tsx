import { Row } from '~/components/shared/layout';
import { BlockDef } from '~/types';
import ActionField from '../../field/action-field';
import useIsTruthyConditions from '../../shared/use-is-truthy-conditions';

type TabsBlockProps = {
  block: BlockDef<'tabs-block'>;
};

function TabsBlock({ block }: TabsBlockProps) {
  return (
    <Row gap={1} crossAxisAlignment="center" mainAxisAlignment="center">
      {block.tabs?.map((tab) => (
        <TabAction key={tab.id} action={tab.action!} />
      ))}
    </Row>
  );
}

type Action = NonNullable<
  NonNullable<BlockDef<'tabs-block'>['tabs']>[number]['action']
>;

type TabActionProps = {
  action: Action;
};

function TabAction({ action }: TabActionProps) {
  const selected = useIsTruthyConditions(action.params || []);
  const decoration = action.decoration!;

  return (
    <ActionField
      action={{
        ...action,
        decoration: selected
          ? decoration
          : { variant: undefined, color: 'inherit' },
      }}
      buttonProps={{
        sx: {
          borderRadius: 16,
          px: 5,
          py: 0.75,
          textTransform: 'capitalize',
          fontSize: '1.25rem',
        },
      }}
    />
  );
}

export default TabsBlock;
