import { createTheme } from '@mui/material';
import { Roboto } from '@next/font/google';

const { breakpoints } = createTheme();

const font = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

const theme = createTheme({
  typography: {
    fontFamily: font.style.fontFamily,
    h4: {
      fontWeight: 900,
      lineHeight: 1.25,
    },
  },
  palette: {
    // mode: 'dark',
    primary: {
      main: '#296CF0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'default',
        elevation: 0,
      },
      styleOverrides: {
        colorDefault: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          margin: 0,
        },
        html: {
          fontSize: 16,
          scrollBehavior: 'smooth',
          [breakpoints.up('xl')]: {
            fontSize: 18,
          },
          [breakpoints.down('lg')]: {
            fontSize: 16,
          },
          [breakpoints.down('sm')]: {
            fontSize: 14,
          },
        },
        '#__next': {
          position: 'relative',
        },
        '*, ::before, ::after': {
          boxSizing: 'border-box',
        },
        p: {
          margin: 0,
        },
        a: {
          textDecoration: 'none',
        },
      },
    },
  },
});

export default theme;
