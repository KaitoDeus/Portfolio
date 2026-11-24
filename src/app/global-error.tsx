'use client';

import './globals.css';
import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Critical root error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 font-sans antialiased">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-2xl space-y-5">
          <div className="text-6xl font-black tracking-tighter">500</div>
          <h1 className="text-xl font-bold">Internal Server Error</h1>
          <p className="text-sm text-muted-foreground">
            A critical application error occurred. Please try reloading the page.
          </p>
          {error?.digest && (
            <div className="rounded-xl bg-secondary px-3 py-2 font-mono text-xs text-muted-foreground">
              $ ERR_HTTP_500 // digest: {error.digest}
            </div>
          )}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold hover:opacity-90 cursor-pointer"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
