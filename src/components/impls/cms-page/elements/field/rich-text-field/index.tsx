import { BoxProps } from '@mui/material';
import React from 'react';
import { Column } from '~/components/shared/layout';
import RichTextFieldNodeChildren from './node-children';
import { RichTextNode } from './types';

type NodeRenderer = (node: RichTextNode) => JSX.Element;

type RichTextFieldProps = BoxProps & {
  /** Payload rich text (Slate JSON). Accepts the loosely-typed generated shape. */
  value?: RichTextNode[] | { [k: string]: unknown }[] | null;
  /** Override rendering of specific top-level node types (e.g. `label`). */
  renderers?: Record<string, NodeRenderer>;
};

function RichTextField({ value, renderers, ...props }: RichTextFieldProps) {
  if (!value?.length) return null;

  return (
    <Column gap={0.5} {...props}>
      <RichTextFieldNodeChildren
        value={value as RichTextNode[]}
        renderers={renderers}
      />
    </Column>
  );
}

export default RichTextField;
