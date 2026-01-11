import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Space_Grotesk } from 'next/font/google';
import { Analytics } from '@/components/analytics';
import { Suspense } from 'react';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const APP_NAME = 'KYRAT Festival Hub';
const APP_DESCRIPTION = 'Your one-stop hub for the KYRAT Festival. Explore events, schedules, and more.';
const APP_URL = 'https://kyrat.live'; // Replace with your actual domain

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
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
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_NAME,
    description: APP_DESCRIPTION,
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
    <html lang="en" className={`dark ${spaceGrotesk.variable}`}>
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
