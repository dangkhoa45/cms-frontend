'use client';

import { ErrorBox } from '@/components/feedback/ErrorBox';
import { useEffect } from 'react';

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Site error:', error);
  }, [error]);

  return (
    <ErrorBox
      title="Site Error"
      message={error.message || 'An error occurred while loading the site'}
      onRetry={reset}
    />
  );
}

