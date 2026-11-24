import type { Metadata } from 'next';
import ErrorStatePage from '@/components/common/ErrorStatePage';

export const metadata: Metadata = {
  title: '500 - Internal Server Error',
  description: 'Internal server error fallback page.',
  robots: { index: false, follow: false },
};

export default function ServerErrorPage() {
  return <ErrorStatePage code="500" />;
}
