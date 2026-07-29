import { Box, BoxProps } from '@mui/material';
import React from 'react';

function ContentBox(props: BoxProps) {
  return (
    <Box width={{ xs: 1, sm: 0.9, lg: 0.8 }} mx="auto" px={3} {...props} />
  );
}

export default ContentBox;
