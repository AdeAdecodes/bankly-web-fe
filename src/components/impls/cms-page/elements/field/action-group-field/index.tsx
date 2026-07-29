import { Row, RowProps } from '~/components/shared/layout';
import { ActionGroup } from '~/types';
import ActionField, { ActionFieldProps } from '../action-field';

type ActionGroupFieldProps = RowProps & {
  actions?: ActionGroup;
  actionProps?:
    | Omit<ActionFieldProps, 'action'>
    | ((
        action: ActionGroup[number]['action']
      ) => Omit<ActionFieldProps, 'action'>);
};

function ActionGroupField({
  actions,
  actionProps,
  ...props
}: ActionGroupFieldProps) {
  if (!actions?.length) return null;

  return (
    <Row {...props}>
      {actions.map((action, index) => {
        const props =
          typeof actionProps === 'function'
            ? actionProps(action.action)
            : actionProps;

        return <ActionField key={index} action={action.action} {...props} />;
      })}
    </Row>
  );
}

export default ActionGroupField;
