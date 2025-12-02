'use client';

import { ErrorBox } from '@/components/feedback/ErrorBox';
import { useEffect } from 'react';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorBox
      title="Something went wrong!"
      message={error.message || 'An unexpected error occurred'}
      onRetry={reset}
    />
  );
}

