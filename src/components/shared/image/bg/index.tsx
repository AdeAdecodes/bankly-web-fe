import { Box } from '@mui/material';
import assert from 'assert';
import extractSrc from '~/utils/extract-src';
import { ImageProps } from '..';

function BgImage({ type, src, fit, position, sx, ...props }: ImageProps) {
  assert(type === 'bg', 'Expected type to be bg');

  return (
    <Box
      className="bg"
      {...props}
      sx={{
        overflow: 'hidden',
        zIndex: 0,
        position: 'absolute',
        inset: 0,
        backgroundRepeat: 'no-repeat',
        backgroundSize: fit || 'cover',
        backgroundPosition: position || 'top right',
        ...sx,
        backgroundImage: `url(${extractSrc(src)})`,
      }}
    />
  );
}

export default BgImage;
