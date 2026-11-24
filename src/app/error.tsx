'use client';

import { useEffect } from 'react';
import ErrorStatePage from '@/components/common/ErrorStatePage';

export default function GlobalSegmentError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled route error:', error);
  }, [error]);

  return (
    <ErrorStatePage
      code="500"
      diagnostic={
        error?.digest
          ? `ERR_HTTP_500 // digest: ${error.digest}`
          : undefined
      }
      onRetry={reset}
    />
  );
}
