import type { CSSProperties } from 'react';
import type {
  AlertPalette,
  AlertSeverity,
  BrandColors,
  CustomShadows,
  Gradients,
  SectionPalette,
  SectionTheme,
} from './tokens';

declare module '@mui/material/styles' {
  interface Palette {
    section: Record<SectionTheme, SectionPalette>;
    alert: Record<AlertSeverity, AlertPalette>;
    brand: BrandColors;
    gradients: Gradients;
    customShadows: CustomShadows;
  }

  interface PaletteOptions {
    section?: Record<SectionTheme, SectionPalette>;
    alert?: Record<AlertSeverity, AlertPalette>;
    brand?: BrandColors;
    gradients?: Gradients;
    customShadows?: CustomShadows;
  }

  interface TypographyVariants {
    eyebrow: CSSProperties;
  }

  interface TypographyVariantsOptions {
    eyebrow?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    eyebrow: true;
  }
}
