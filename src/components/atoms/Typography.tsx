'use client';

import { Typography as MuiTypography, TypographyProps as MuiTypographyProps } from '@mui/material';

export interface TypographyProps extends MuiTypographyProps {
  // Extend with custom props if needed
}

export function Typography({ children, ...props }: TypographyProps) {
  return <MuiTypography {...props}>{children}</MuiTypography>;
}

