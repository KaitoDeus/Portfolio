import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://kaitodeus-portfolio.vercel.app'),
  title: 'Portfolio | Võ Anh Khải',
  description:
    'Võ Anh Khải - Software Engineering Student from Vietnam. Passionate about Game Development, Full Stack Development, and UI/UX Design.',
  keywords: ['Võ Anh Khải', 'Portfolio', 'Software Engineer', 'Game Developer', 'Vietnam', 'UTH'],
  authors: [{ name: 'Võ Anh Khải' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Võ Anh Khải | Software Engineering',
    description: 'Portfolio of Võ Anh Khải - Software Engineering Student from Vietnam',
    images: ['/android-chrome-512x512.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Võ Anh Khải | Software Engineering',
    description: 'Portfolio of Võ Anh Khải - Software Engineering Student from Vietnam',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable}>
      <head>
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
        {children}
      </body>
    </html>
  );
}
