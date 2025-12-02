'use client';

import { Box, CircularProgress, Typography } from '@mui/material';

export interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export default function LoadingState({
  message = 'Đang tải dữ liệu...',
  fullScreen = false,
}: LoadingStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={fullScreen ? { minHeight: '100vh' } : { py: 4 }}
    >
      <CircularProgress />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}


