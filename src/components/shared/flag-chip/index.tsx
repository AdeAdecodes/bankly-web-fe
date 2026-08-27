import { Box, BoxProps } from '@mui/material';

/** Small Nigerian flag swatch used next to "Federal Republic of Nigeria". */
function FlagChip(props: BoxProps) {
  return (
    <Box
      role="img"
      aria-label="Flag of Nigeria"
      {...props}
      sx={{
        width: 26,
        height: 17,
        borderRadius: '2px',
        flexShrink: 0,
        boxShadow: (theme) => theme.palette.customShadows.flag,
        background: (theme) => theme.palette.gradients.flag,
        ...props.sx,
      }}
    />
  );
}

export default FlagChip;
