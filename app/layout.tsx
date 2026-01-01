import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Space_Grotesk, Pinyon_Script } from 'next/font/google';
import { Analytics } from '@/components/analytics';
import { Suspense } from 'react';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const pinyonScript = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pinyon',
});

const APP_NAME = 'Kyrat';
const APP_DESCRIPTION = 'Your one-stop hub for Kyrat. Explore events, schedules, and more.';
const APP_URL = 'https://kyrat.live'; // Replace with your actual domain

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    locale: 'en_US',
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ['/logo.png'],
  },
  metadataBase: new URL(APP_URL),
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF', // Corresponds to your light theme background
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${pinyonScript.variable}`}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <Suspense>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}

