'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  // Extend with custom props if needed
}

export function Button({ children, ...props }: ButtonProps) {
  return <MuiButton {...props}>{children}</MuiButton>;
}

