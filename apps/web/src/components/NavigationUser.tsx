'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

export type NavigationUserProps = {
  children?: ReactNode;
};

const NavigationUser: FC<NavigationUserProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export { NavigationUser };
