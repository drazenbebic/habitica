'use client';

import { FC } from 'react';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@ariakit/react';

type Props = {
  className?: string;
};

const UserAvatar: FC<Props> = ({ className }) => {
  const { data: session, status } = useSession();

  return (
    <div className={className}>
      <SessionProvider>
        {status === 'loading' && (
          <div className="w-12 h-12 bg-neutral-300 flex rounded-full items-center justify-center">
            <svg
              className="animate-spin h-6 w-6 text-violet-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
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
                  className="w-12 h-12 rounded-full bg-neutral-200"
                  onClick={() => {
                    signOut();
                  }}
                >
                  O
                </Button>
              </div>
            )}
          </>
        )}
        {status === 'unauthenticated' && (
          <Link
            className="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200"
            href="/sign-in"
          >
            &gt;
          </Link>
        )}
      </SessionProvider>
    </div>
  );
};

export { UserAvatar };
