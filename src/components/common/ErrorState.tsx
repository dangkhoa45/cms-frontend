'use client';

import { Box, Alert, AlertTitle, Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export default function ErrorState({
  title = 'Đã xảy ra lỗi',
  message,
  onRetry,
  retryLabel = 'Thử lại',
}: ErrorStateProps) {
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


