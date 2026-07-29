import { Box } from '@mui/material';
import assert from 'assert';
import extractSrc from '~/utils/extract-src';
import { ImageProps } from '..';

function NormalImage({ type, src, fit, position, sx, ...props }: ImageProps) {
  assert(!type || type === 'normal');

  return (
    <Box
      {...props}
      component="img"
      src={extractSrc(src)}
      sx={{
        objectFit: fit,
        objectPosition: position,
        ...sx,
      }}
    />
  );
}

export default NormalImage;
