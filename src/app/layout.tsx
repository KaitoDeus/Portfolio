import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/layout/MainLayout';

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-montserrat',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kaitodeus-portfolio.vercel.app';

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Võ Anh Khải (Kaito) | Software & Game Developer',
    template: '%s | Võ Anh Khải (Kaito)',
  },
  description:
    'Portfolio of Võ Anh Khải (Kaito) - Software & Game Developer specializing in Full-Stack Web Development, 3D Games (Unity), and Mobile Applications (Android/Kotlin).',
  keywords: [
    'Võ Anh Khải',
    'Kaito',
    'KaitoDeus',
    'Software Developer',
    'Game Developer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'Unity 3D',
    'C#',
    'TypeScript',
    'Spring Boot',
    'Kotlin',
    'Android Development',
    'Portfolio',
    'Vietnam Developer',
  ],
  authors: [{ name: 'Võ Anh Khải', url: SITE_URL }],
  creator: 'Võ Anh Khải (Kaito)',
  publisher: 'Võ Anh Khải',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
    url: SITE_URL,
    siteName: 'Võ Anh Khải Portfolio',
    title: 'Võ Anh Khải (Kaito) | Software & Game Developer',
    description:
      'Portfolio of Võ Anh Khải (Kaito) - Software & Game Developer specializing in Full-Stack Web Development, 3D Games (Unity), and Mobile Applications.',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'Võ Anh Khải (Kaito) - Software & Game Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Võ Anh Khải (Kaito) | Software & Game Developer',
    description:
      'Portfolio of Võ Anh Khải (Kaito) - Software & Game Developer specializing in Full-Stack Web Development, 3D Games, and Mobile Applications.',
    images: ['/android-chrome-512x512.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Võ Anh Khải',
      alternateName: ['Kaito', 'KaitoDeus'],
      jobTitle: 'Software & Game Developer',
      url: SITE_URL,
      image: `${SITE_URL}/android-chrome-512x512.png`,
      email: 'mailto:khaivo300605@gmail.com',
      sameAs: [
        'https://github.com/KaitoDeus',
        'https://www.linkedin.com/in/kaitodeus',
      ],
      knowsAbout: [
        'Software Engineering',
        'Game Development',
        'Unity 3D',
        'C#',
        'React',
        'Next.js',
        'TypeScript',
        'Spring Boot',
        'Java',
        'Kotlin',
        'Android Development',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Võ Anh Khải (Kaito) Portfolio',
      description: 'Official portfolio website of Võ Anh Khải (Kaito) - Software & Game Developer',
      publisher: {
        '@id': `${SITE_URL}/#person`,
      },
      inLanguage: ['vi-VN', 'en-US'],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="font-sans antialiased min-h-screen bg-background text-foreground transition-colors duration-300"
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
