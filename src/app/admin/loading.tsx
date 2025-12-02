'use client';

import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </div>
  );
}

