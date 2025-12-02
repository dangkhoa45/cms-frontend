'use client';

import { Box, Alert, AlertTitle, Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

interface ErrorBoxProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorBox({
  title = 'Error',
  message,
  onRetry,
  retryLabel = 'Retry',
}: ErrorBoxProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Alert
        severity="error"
        icon={<ErrorOutline />}
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              {retryLabel}
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}

