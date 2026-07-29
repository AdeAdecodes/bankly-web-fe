import { Box, BoxProps } from '@mui/material';
import React from 'react';

type AspectRatioProps<C extends React.ElementType> = Omit<
  BoxProps<C>,
  'children'
> & {
  value: number;
  children: React.ReactElement<HTMLElement>;
  useSx?: boolean;
};

function AspectRatio<C extends React.ElementType>({
  value,
  children,
  useSx,
  ...props
}: AspectRatioProps<C>) {
  const styleProp = useSx ? 'sx' : 'style';

  return (
    <Box position="relative" width={1} {...props}>
      <div style={{ paddingTop: `${(1 / value) * 100}%` }} />
      {React.cloneElement(React.Children.only(children), {
        ...children.props,
        [styleProp]: {
          position: 'absolute',
          inset: '0px',
          width: '100%',
          height: '100%',
          ...(children.props as Record<string, any>)?.[styleProp],
        } as CSSStyleDeclaration,
      })}
    </Box>
  );
}

export default AspectRatio;
