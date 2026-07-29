import { Typography } from '@mui/material';

function RichTextLabel({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Typography
      variant="body2"
      textTransform="uppercase"
      color="primary"
      letterSpacing="0.1em"
      fontWeight={600}
    >
      {children}
    </Typography>
  );
}

export default RichTextLabel;
