import { Box, BoxProps } from '@mui/material';
import { ChevronRight } from 'mdi-material-ui';
import { getMediaUrl, MediaLike } from '~/helpers/media';

type IconBoxProps = BoxProps & {
  icon?: MediaLike;
  size?: number;
  radius?: string;
};

/** Cream tile with an uploaded icon (casa-web `.ti`, `.pi`, `.ci`). */
function IconBox({
  icon,
  size = 48,
  radius = '12px',
  className,
  sx,
  ...props
}: IconBoxProps) {
  const url = getMediaUrl(icon);

  return (
    <Box
      className={['nhc-icon-box', className].filter(Boolean).join(' ')}
      {...props}
      sx={{
        width: size,
        height: size,
        borderRadius: radius,
        bgcolor: 'brand.cream',
        color: 'primary.dark',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'background-color .15s, color .15s',
        ...sx,
      }}
    >
      {url ? (
        <Box
          component="img"
          src={url}
          alt=""
          sx={{ width: size * 0.48, height: size * 0.48, objectFit: 'contain' }}
        />
      ) : (
        <ChevronRight sx={{ fontSize: size * 0.5 }} />
      )}
    </Box>
  );
}

export default IconBox;
