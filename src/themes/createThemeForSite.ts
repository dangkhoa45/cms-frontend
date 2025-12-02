import { createTheme, Theme } from '@mui/material/styles';
import type { SiteTheme } from '@/types/site';

/**
 * Create MUI theme based on site configuration
 */
export function createThemeForSite(siteTheme: SiteTheme): Theme {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: siteTheme.primaryColor || '#1976d2',
      },
      secondary: {
        main: siteTheme.secondaryColor || '#dc004e',
      },
      background: {
        default: siteTheme.backgroundColor || '#ffffff',
        paper: '#ffffff',
      },
      text: {
        primary: siteTheme.textColor || '#000000',
      },
    },
    typography: {
      fontFamily: siteTheme.fontFamily || [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });
}

/**
 * Default theme for admin panel
 */
export function createAdminTheme(): Theme {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  });
}

