'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SessionProvider, signOut, useSession } from 'next-auth/react';

import { Button } from '@ariakit/react';
import { Loading02Icon, Login01Icon, Logout04Icon } from 'hugeicons-react';

export type UserAvatarProps = {
  className?: string;
};

const UserAvatar: FC<UserAvatarProps> = ({ className }) => {
  const { data: session, status } = useSession();

  return (
    <div className={className}>
      <SessionProvider>
        {status === 'loading' && (
          <div className="w-12 h-12 bg-neutral-300 flex rounded-full items-center justify-center">
            <Loading02Icon
              className="animate-spin text-violet-500"
              width={24}
              height={24}
            />
          </div>
        )}
        {status === 'authenticated' && (
          <>
            {!!session?.user?.image && (
              <div className="flex gap-2">
                <Button
                  render={
                    <Link href="/profile" passHref>
                      <Image
                        className="w-12 h-12 rounded-full"
                        alt={session.user?.name || 'Unknown User'}
                        title={session.user?.name || 'Unknown User'}
                        width={80}
                        height={80}
                        src={session?.user?.image}
                      />
                    </Link>
                  }
                />
                <Button
                  className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center"
                  title="Sign out"
                  onClick={() => signOut()}
                >
                  <Logout04Icon
                    className="text-violet-500"
                    width={24}
                    height={24}
                  />
                </Button>
              </div>
            )}
          </>
        )}
        {status === 'unauthenticated' && (
          <Link
            className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200"
            href="/sign-in"
            title="Sign in"
          >
            <Login01Icon className="text-violet-500" width={24} height={24} />
          </Link>
        )}
      </SessionProvider>
    </div>
  );
};

export { UserAvatar };
