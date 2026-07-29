import { BoxProps } from '@mui/material';
import { Column } from '~/components/shared/layout';
import RichTextFieldNodeChildren from './node-children';
import { RichTextNode } from './types';

type RichTextFieldProps = BoxProps & {
  value: RichTextNode[];
};

function RichTextField({ value, ...props }: RichTextFieldProps) {
  if (!value) return null;

  return (
    <Column gap={0.5} {...props}>
      <RichTextFieldNodeChildren value={value} />
    </Column>
  );
}

export default RichTextField;
