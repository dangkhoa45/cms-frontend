'use client';

import ErrorState from '@/components/common/ErrorState';
import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin error:', error);
  }, [error]);

  return (
    <ErrorState
      title="Admin Error"
      message={error.message || 'An error occurred in the admin panel'}
      onRetry={reset}
    />
  );
}

