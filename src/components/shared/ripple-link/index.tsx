/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import Link, { LinkProps } from '../link';
import Ripple, { RippleProps } from '../ripple';

type RippleLinkProps<C extends React.ElementType> = RippleProps<C> & {
  linkProps?: LinkProps;
};

const RippleLink = React.forwardRef(function RippleLinkInner<
  C extends React.ElementType
>({ linkProps, ...props }: RippleLinkProps<C>, ref: any) {
  return (
    <Ripple
      ref={ref}
      component={linkProps?.href ? Link : undefined}
      {...linkProps}
      {...props}
    />
  );
});

export default RippleLink;
