import type { Metadata } from 'next';
import ContactPage from '@/sections/Contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact & AI Assistant | Võ Anh Khải',
  description:
    'Get in touch with Võ Anh Khải via email, phone, or LinkedIn, or chat live with his intelligent Gemini AI assistant.',
};

export default function Page() {
  return <ContactPage />;
}
