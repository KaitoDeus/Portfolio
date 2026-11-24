import type { Metadata } from 'next';
import ErrorStatePage from '@/components/common/ErrorStatePage';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The requested page could not be found.',
};

export default function NotFoundPage() {
  return <ErrorStatePage code="404" />;
}
