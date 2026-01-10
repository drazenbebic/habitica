'use client';

import { FC, ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

import { Toaster } from 'sonner';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast:
              'group !bg-white !border-slate-200 !shadow-xl !shadow-violet-900/5 !rounded-2xl !p-4 gap-3',
            title: '!text-slate-900 !font-semibold !text-sm',
            description: '!text-slate-500 !text-sm',
            actionButton: '!bg-violet-600 !text-white !font-medium !rounded-lg',
            cancelButton:
              '!bg-slate-100 !text-slate-600 !font-medium !rounded-lg',
            error: '!text-red-600 !border-red-100 !bg-red-50/50',
            success: '!text-emerald-600 !border-emerald-100 !bg-emerald-50/50',
            warning: '!text-amber-600 !border-amber-100 !bg-amber-50/50',
            info: '!text-blue-600 !border-blue-100 !bg-blue-50/50',
          },
        }}
      />
    </SessionProvider>
  );
};
