import type { Metadata } from 'next';
import ErrorStatePage from '@/components/common/ErrorStatePage';

export const metadata: Metadata = {
  title: '403 - Access Forbidden',
  description: 'Access to this resource is forbidden.',
  robots: { index: false, follow: false },
};

export default function Forbidden403Page() {
  return <ErrorStatePage code="403" />;
}
