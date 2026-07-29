import getActionHref from '~/helpers/get-action-href';
import useIsActiveUrlFn from '~/helpers/use-is-active-url-fn';
import { BlockDef } from '~/types';
import ActionGroupField from '../../field/action-group-field';

type ActionGroupBlockProps = {
  block: BlockDef<'action-group-block'>;
};

function ActionGroupBlock({ block }: ActionGroupBlockProps) {
  const isActiveUrl = useIsActiveUrlFn();

  return (
    <ActionGroupField
      actions={block.actions}
      gap={2}
      actionProps={(action) => {
        return {
          color: isActiveUrl(getActionHref(action!)) ? 'primary' : undefined,
          sx: {
            fontSize: 12,
          },
        };
      }}
    />
  );
}

export default ActionGroupBlock;
