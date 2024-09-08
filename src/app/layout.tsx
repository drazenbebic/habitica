'use client';

import React, { FC } from 'react';
import './global.scss';
import { Avatar, Button, Heading, Pane, Paragraph } from 'evergreen-ui';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

type Props = {
  children: React.ReactNode;
};

const RootLayout: FC<Props> = ({ children }) => {
  const user = false;
  return (
    <html lang="en">
      <body>
        <header>
          <Pane
            height={80}
            padding={16}
            background="tint2"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom
          >
            <Pane flex={1}>
              <Heading size={600}>Habitica x moonshiner</Heading>
            </Pane>
            {user ? (
              <Pane display="flex" alignItems="center">
                <Avatar name="Moonie" size={40} src="" />
                <Paragraph marginLeft={8}>Moonie</Paragraph>
                <Button onClick={() => {}} appearance="primary" marginLeft={8}>
                  Logout
                </Button>
              </Pane>
            ) : (
              <Pane>
                <Button onClick={() => {}} appearance="primary">
                  Login with Google
                </Button>
              </Pane>
            )}
          </Pane>
        </header>
        <main id="content">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
