import { Box, BoxProps, Typography, TypographyProps } from '@mui/material';
import { useSectionPalette } from '../section-wrapper';

/** Small uppercase kicker (casa-web `.k`). */
export function Eyebrow({ color, ...props }: TypographyProps) {
  const palette = useSectionPalette();
  return (
    <Typography variant="eyebrow" color={color ?? palette.kicker} {...props} />
  );
}

type SectionHeadingProps = {
  eyebrow?: string | null;
  heading?: string | null;
  intro?: string | null;
  align?: 'center' | 'left';
  maxWidth?: number;
  mb?: BoxProps['mb'];
  headingComponent?: 'h1' | 'h2' | 'h3';
  headingSx?: TypographyProps['sx'];
};

/** The "kicker / heading / intro" trio that opens most sections (`.shead`). */
function SectionHeading({
  eyebrow,
  heading,
  intro,
  align = 'center',
  maxWidth = 640,
  mb,
  headingComponent = 'h2',
  headingSx,
}: SectionHeadingProps) {
  const palette = useSectionPalette();

  if (!eyebrow && !heading && !intro) return null;

  const centered = align === 'center';

  return (
    <Box
      textAlign={align}
      maxWidth={centered ? maxWidth : undefined}
      mx={centered ? 'auto' : undefined}
      mb={mb ?? { xs: 4, md: 7 }}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      {heading && (
        <Typography
          variant="h2"
          component={headingComponent}
          color={palette.heading}
          mt={eyebrow ? 1.25 : 0}
          sx={{ fontSize: { xs: 26, md: 32 }, ...headingSx }}
        >
          {heading}
        </Typography>
      )}
      {intro && (
        <Typography color={palette.muted} mt={1.5}>
          {intro}
        </Typography>
      )}
    </Box>
  );
}

export default SectionHeading;
