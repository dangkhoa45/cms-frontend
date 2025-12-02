'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createThemeForSite, createAdminTheme } from './createThemeForSite';
import type { SiteTheme } from '@/types/site';
import { useMemo } from 'react';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
  siteTheme?: SiteTheme;
  isAdmin?: boolean;
}

export function ThemeProviderWrapper({
  children,
  siteTheme,
  isAdmin = false,
}: ThemeProviderWrapperProps) {
  const theme = useMemo(() => {
    if (isAdmin) {
      return createAdminTheme();
    }
    if (siteTheme) {
      return createThemeForSite(siteTheme);
    }
    return createAdminTheme();
  }, [siteTheme, isAdmin]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

