/**
 * Design tokens — the single place colours, fonts, gradients and shadows are
 * defined. Values mirror the casa-web reference site's CSS custom properties
 * (`--green`, `--deep`, `--gold`, …). Components must reference these through
 * the MUI theme (`theme.palette.*`) rather than hardcoding values.
 */

export const colors = {
  green: '#008751',
  greenBright: '#0aa363',
  deep: '#00472b',
  deepest: '#00281a',
  gold: '#c9a227',
  goldSoft: '#e6d39a',
  goldInk: '#7a631a',
  goldHover: '#d9b53f',
  cream: '#f7f4ec',
  creamLine: '#e3ddca',
  chip: '#efe8d3',
  paper: '#ffffff',
  ink: '#1d2823',
  inkSoft: '#3a4741',
  navInk: '#33413a',
  menuInk: '#2a3831',
  grey: '#5e6963',
  line: '#ece7da',
  white: '#ffffff',
  /** light text tones used on deep-green backgrounds */
  mintText: '#d5e8de',
  mintMuted: '#8fb3a2',
  mintLink: '#b3d0c2',
  heroText: '#e8f2ec',
  danger: '#8a2020',
} as const;

export type BrandColors = typeof colors;

export const fonts = {
  sans: "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
  serif: "Georgia, 'Times New Roman', Times, serif",
} as const;

export type SectionTheme = 'paper' | 'cream' | 'deep' | 'gold';

export type SectionPalette = {
  /** section background */
  bg: string;
  /** default text */
  fg: string;
  /** secondary text */
  muted: string;
  /** small uppercase kicker above headings */
  kicker: string;
  /** heading colour */
  heading: string;
  /** hairlines / borders */
  line: string;
  /** card surfaces placed on the section */
  card: string;
  /** emphasised numbers / icons */
  accent: string;
};

export const sectionPalettes: Record<SectionTheme, SectionPalette> = {
  paper: {
    bg: colors.paper,
    fg: colors.ink,
    muted: colors.grey,
    kicker: colors.goldInk,
    heading: colors.deep,
    line: colors.line,
    card: colors.paper,
    accent: colors.green,
  },
  cream: {
    bg: colors.cream,
    fg: colors.ink,
    muted: colors.grey,
    kicker: colors.goldInk,
    heading: colors.deep,
    line: colors.creamLine,
    card: colors.paper,
    accent: colors.green,
  },
  deep: {
    bg: colors.deep,
    fg: colors.white,
    muted: colors.mintText,
    kicker: colors.goldSoft,
    heading: colors.white,
    line: 'rgba(255,255,255,0.14)',
    card: 'rgba(255,255,255,0.06)',
    accent: colors.goldSoft,
  },
  gold: {
    bg: colors.goldSoft,
    fg: colors.ink,
    muted: '#5a4a15',
    kicker: colors.goldInk,
    heading: colors.deep,
    line: '#d9c78a',
    card: colors.paper,
    accent: colors.deep,
  },
};

export type AlertSeverity = 'notice' | 'warning' | 'emergency';

export type AlertPalette = {
  bg: string;
  fg: string;
  accent: string;
  badgeFg: string;
  border: string;
  dot: string;
};

export const alertPalettes: Record<AlertSeverity, AlertPalette> = {
  notice: {
    bg: '#e9f2ec',
    fg: '#123f2a',
    accent: '#0f6a4a',
    badgeFg: '#ffffff',
    border: '#cfe1d7',
    dot: '#0f6a4a',
  },
  warning: {
    bg: '#f7edcf',
    fg: '#5a4a15',
    accent: '#a9801f',
    badgeFg: '#ffffff',
    border: '#e8d9a8',
    dot: '#a9801f',
  },
  emergency: {
    bg: '#8a2020',
    fg: '#ffffff',
    accent: '#ffffff',
    badgeFg: '#8a2020',
    border: '#6e1717',
    dot: '#ffd6d6',
  },
};

export const gradients = {
  deepBand: `linear-gradient(120deg, ${colors.deep}, ${colors.deepest})`,
  portrait: `linear-gradient(160deg, #0a5c3a, ${colors.deepest})`,
  heroOverlay:
    'linear-gradient(180deg, rgba(4,10,7,0.34) 0%, rgba(4,10,7,0.14) 45%, rgba(3,10,6,0.64) 100%)',
  bandOverlay:
    'linear-gradient(90deg, rgba(2,12,8,0.88) 0%, rgba(3,13,9,0.58) 48%, rgba(3,13,9,0.12) 100%)',
  cardFade:
    'linear-gradient(180deg, rgba(0,30,18,0) 38%, rgba(0,22,13,0.9) 100%)',
  plateFade: 'linear-gradient(180deg, rgba(0,30,18,0), rgba(0,22,13,0.82))',
  goldGlow: 'radial-gradient(circle, rgba(201,162,39,0.16), transparent 70%)',
  flag: `linear-gradient(90deg, ${colors.green} 0 33.33%, ${colors.white} 33.33% 66.66%, ${colors.green} 66.66% 100%)`,
} as const;

export type Gradients = typeof gradients;

export const customShadows = {
  card: '0 14px 36px rgba(0,40,25,0.08)',
  cardStrong: '0 16px 40px rgba(0,40,25,0.14)',
  portrait: '0 22px 54px rgba(0,40,25,0.2)',
  menu: '0 18px 40px rgba(0,20,12,0.16)',
  drawer: '-14px 0 44px rgba(0,20,12,0.32)',
  hero: '0 20px 50px rgba(0,20,12,0.4)',
  heroText: '0 2px 18px rgba(0,20,12,0.45)',
  heroTagline: '0 1px 10px rgba(0,20,12,0.5)',
  logoPlate: '0 2px 10px rgba(0,0,0,0.22)',
  flag: '0 1px 4px rgba(0,0,0,0.25)',
} as const;

export type CustomShadows = typeof customShadows;

export const layout = {
  contentMaxWidth: 1180,
  headerHeight: { xs: 66, md: 80 },
} as const;
