import { Box, BoxProps } from '@mui/material';
import React from 'react';

type PageProps = BoxProps;

function Page(props: PageProps, ref: React.Ref<unknown>) {
  return <Box {...props} ref={ref} width={1} />;
}

export default React.forwardRef(Page);
