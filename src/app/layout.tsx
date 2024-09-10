import './globals.css';
import React, { FC, ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navigation } from '@/components';
import { Inter } from 'next/font/google';
import cn from 'classnames';

type Props = {
  children: ReactNode;
};

const inter = Inter({ display: 'swap', subsets: ['latin'], preload: true });

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <header>
          <Navigation />
        </header>
        <main id="content">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
