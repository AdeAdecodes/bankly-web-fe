import { ButtonBase, ButtonBaseProps } from '@mui/material';
import React from 'react';

export type RippleProps<C extends React.ElementType> = Partial<
  ButtonBaseProps<C, { component?: C }>
>;

function Ripple<C extends React.ElementType>(
  props: RippleProps<C>,
  ref: React.Ref<HTMLButtonElement>
) {
  return (
    <ButtonBase
      ref={ref}
      component="div"
      {...props}
      sx={{
        textAlign: 'start',
        justifyContent: 'start',
        alignItems: 'start',
        ...props.sx,
      }}
    />
  );
}

export default React.forwardRef(Ripple);
