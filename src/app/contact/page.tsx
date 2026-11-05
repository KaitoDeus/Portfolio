import type { Metadata } from 'next';
import ContactPage from '@/sections/Contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact & Get in Touch',
  description:
    'Get in touch with Võ Anh Khải (Kaito) via email, phone, or LinkedIn, or chat live with his intelligent AI assistant.',
  alternates: {
    canonical: '/contact',
  },
};

export default function Page() {
  return <ContactPage />;
}
