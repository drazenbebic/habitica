import { FC } from 'react';
import { NavigationUser, UserAvatar } from '@/components';
import Link from 'next/link';
import Image from 'next/image';

type Props = {};

const Navigation: FC<Props> = () => {
  return (
    <div className="bg-neutral-100">
      <div className="flex max-w-screen-lg mx-auto justify-between items-center p-4">
        <Link href="/">
          <h1 className="w-12 h-12 flex items-center justify-center bg-white rounded-full">
            <Image src="/habitica.png" alt="Habitica" width={24} height={24} />
          </h1>
        </Link>
        <NavigationUser>
          <UserAvatar />
        </NavigationUser>
      </div>
    </div>
  );
};

export { Navigation };
