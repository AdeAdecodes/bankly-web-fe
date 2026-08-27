import { Box, BoxProps, useTheme } from '@mui/material';
import React from 'react';
import ContentBox from '~/components/generics/content-box';
import { SectionPalette, sectionPalettes, SectionTheme } from '~/theme/tokens';
import { SectionSettings } from '~/types';

type SectionSpacing = NonNullable<SectionSettings['spacing']>;

/** Lets children (headings, cards) pick colours that suit the section theme. */
export const SectionPaletteContext = React.createContext<SectionPalette>(
  sectionPalettes.paper
);

export function useSectionPalette() {
  return React.useContext(SectionPaletteContext);
}

const SPACING: Record<SectionSpacing, BoxProps['py']> = {
  default: { xs: 7, md: 10.5 },
  compact: { xs: 5, md: 6.5 },
  spacious: { xs: 9, md: 12 },
  none: 0,
};

export type SectionWrapperProps = Omit<BoxProps<'section'>, 'id'> & {
  /** The block's `section` settings (theme + spacing). */
  section?: Partial<SectionSettings> | null;
  /** Anchor id — the block's `blockName`. */
  id?: string | null;
  /** Wrap children in the centred content column (default). */
  boxed?: boolean;
  contentProps?: BoxProps;
};

/**
 * The outer band every block renders into. Resolves the named theme token to
 * real colours from the MUI theme; nothing here or in blocks hardcodes a colour.
 */
function SectionWrapper({
  section,
  id,
  boxed = true,
  contentProps,
  children,
  sx,
  ...props
}: SectionWrapperProps) {
  const theme = useTheme();
  const themeKey: SectionTheme = section?.theme ?? 'paper';
  const palette = theme.palette.section[themeKey];
  const spacing: SectionSpacing = section?.spacing ?? 'default';
  const background =
    themeKey === 'deep' ? theme.palette.gradients.deepBand : palette.bg;

  return (
    <SectionPaletteContext.Provider value={palette}>
      <Box
        component="section"
        id={id || undefined}
        position="relative"
        color={palette.fg}
        py={SPACING[spacing]}
        {...props}
        sx={{ background, overflow: 'hidden', ...sx }}
      >
        {boxed ? (
          <ContentBox position="relative" zIndex={1} {...contentProps}>
            {children}
          </ContentBox>
        ) : (
          children
        )}
      </Box>
    </SectionPaletteContext.Provider>
  );
}

export default SectionWrapper;
