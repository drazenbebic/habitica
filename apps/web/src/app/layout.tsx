import './globals.css';

import React, { FC, ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import cn from 'classnames';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Providers } from '@/components/Providers';

type Props = {
  children: ReactNode;
};

const inter = Inter({
  display: 'swap',
  subsets: ['latin'],
  preload: true,
  fallback: ['sans-serif'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Habitica Sync',
    default: 'Habitica Sync',
  },
  icons: {
    icon: [
      {
        url: '/habitica_favicon.png',
        href: '/habitica_favicon.png',
      },
    ],
  },
};

const RootLayout: FC<Props> = async ({ children }) => {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex min-h-screen flex-col')}>
        <Providers>
          <Header />
          <main id="content" className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
