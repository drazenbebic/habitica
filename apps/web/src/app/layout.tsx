import './globals.css';

import React, { FC, ReactNode } from 'react';
import { Inter } from 'next/font/google';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import cn from 'classnames';

import { Header } from '@/components/Header';

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

const RootLayout: FC<Props> = async ({ children }) => {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <Header />
        <main id="content">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
