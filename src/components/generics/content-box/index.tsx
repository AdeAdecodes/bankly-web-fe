import { Box, BoxProps } from '@mui/material';
import React from 'react';
import { layout } from '~/theme/tokens';

/** The casa-web `.wrap`: centred, max 1180px, 28px (20px on phones) gutters. */
function ContentBox(props: BoxProps, ref: React.Ref<unknown>) {
  return (
    <Box
      ref={ref}
      width={1}
      maxWidth={layout.contentMaxWidth}
      mx="auto"
      px={{ xs: 2.5, sm: 3.5 }}
      {...props}
    />
  );
}

export default React.forwardRef(ContentBox);
