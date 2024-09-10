'use client';

import { NextPage } from 'next';
import React, { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@ariakit/react';
import Image from 'next/image';

const SignIn: NextPage = () => {
  const services = [
    {
      label: 'Google',
      provider: 'google',
    },
    {
      label: 'GitHub',
      provider: 'github',
    },
  ];

  return (
    <Suspense>
      <div className="flex flex-col gap-4 max-w-96 mx-auto mt-20">
        {services.map(({ label, provider }) => (
          <Button
            key={provider}
            className="p-2 bg-neutral-200 rounded-full flex gap-4 items-center hover:bg-neutral-300"
            onClick={() => signIn(provider)}
          >
            <div className="flex justify-center items-center w-12 h-12 rounded-full bg-white">
              <Image
                alt={label}
                width={24}
                height={24}
                src={`https://authjs.dev/img/providers/${provider}.svg`}
              />
            </div>
            <span className="text-lg text-neutral-800">
              Sign in with {label}
            </span>
          </Button>
        ))}
      </div>
    </Suspense>
  );
};

export default SignIn;
