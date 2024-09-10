'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children?: ReactNode;
};

const NavigationUser: FC<Props> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export { NavigationUser };
