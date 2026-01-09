import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { NavigationUser } from '@/components/NavigationUser';
import { UserAvatar } from '@/components/UserAvatar';

const Header: FC = () => {
  return (
    <header className="bg-neutral-100">
      <div className="flex max-w-5xl mx-auto justify-between items-center p-4">
        <Link href="/">
          <h1 className="w-12 h-12 flex items-center justify-center bg-white rounded-full">
            <Image src="/habitica.png" alt="Habitica" width={24} height={24} />
          </h1>
        </Link>
        <NavigationUser>
          <UserAvatar />
        </NavigationUser>
      </div>
    </header>
  );
};

export { Header };
