import { createTheme } from '@mui/material';
import {
  alertPalettes,
  colors,
  customShadows,
  fonts,
  gradients,
  sectionPalettes,
} from './tokens';

/**
 * Site theme for the Nigeria High Commission, Canberra. All colours, fonts,
 * gradients and shadows come from `./tokens` — nothing else in `src/` should
 * hardcode a colour value.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.green,
      light: colors.greenBright,
      dark: colors.deep,
      contrastText: colors.white,
    },
    secondary: {
      main: colors.gold,
      light: colors.goldSoft,
      dark: colors.goldInk,
      contrastText: colors.deepest,
    },
    error: { main: colors.danger },
    background: { default: colors.paper, paper: colors.paper },
    text: { primary: colors.ink, secondary: colors.grey },
    divider: colors.line,
    section: sectionPalettes,
    alert: alertPalettes,
    brand: colors,
    gradients,
    customShadows,
  },
  typography: {
    fontFamily: fonts.sans,
    h1: {
      fontFamily: fonts.serif,
      fontWeight: 400,
      fontSize: '2.75rem',
      lineHeight: 1.12,
    },
    h2: {
      fontFamily: fonts.serif,
      fontWeight: 400,
      fontSize: '2rem',
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: fonts.serif,
      fontWeight: 400,
      fontSize: '1.3125rem',
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: fonts.serif,
      fontWeight: 400,
      fontSize: '1.1875rem',
      lineHeight: 1.3,
    },
    h5: {
      fontFamily: fonts.sans,
      fontWeight: 700,
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: fonts.sans,
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    body1: { fontSize: '0.9375rem', lineHeight: 1.6 },
    body2: { fontSize: '0.84375rem', lineHeight: 1.55 },
    caption: { fontSize: '0.78125rem', lineHeight: 1.45 },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.90625rem',
    },
    eyebrow: {
      fontFamily: fonts.sans,
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      lineHeight: 1.4,
    },
  },
  shape: { borderRadius: 9 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
          WebkitFontSmoothing: 'antialiased',
        },
        body: { margin: 0, overflowX: 'hidden' },
        '#__next': { position: 'relative' },
        p: { margin: 0 },
        a: { color: 'inherit', textDecoration: 'none' },
        'a:focus-visible, button:focus-visible, input:focus-visible': {
          outline: `3px solid ${colors.gold}`,
          outlineOffset: 2,
          borderRadius: 6,
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animation: 'none !important',
            transition: 'none !important',
          },
          html: { scrollBehavior: 'auto' },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 9,
          paddingInline: 26,
          paddingBlock: 13,
          minHeight: 48,
          fontWeight: 600,
          lineHeight: 1.2,
        },
        sizeSmall: { minHeight: 40, paddingInline: 18, paddingBlock: 9 },
        outlined: { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: { eyebrow: 'p' },
      },
    },
    MuiPaper: {
      styleOverrides: { rounded: { borderRadius: 12 } },
    },
  },
});

export default theme;
