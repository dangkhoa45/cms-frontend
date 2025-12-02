'use client';

import { Box, Typography } from '@mui/material';
import { Inbox } from '@mui/icons-material';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No data',
  message = 'There is no data to display.',
  icon,
}: EmptyStateProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ py: 8, px: 2 }}
    >
      {icon || <Inbox sx={{ fontSize: 64, color: 'text.secondary' }} />}
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}

