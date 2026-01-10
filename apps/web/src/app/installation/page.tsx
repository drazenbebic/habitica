import React, { Suspense } from 'react';
import { Metadata, NextPage } from 'next';

import { InstallationForm } from '@/components/InstallationForm';

export const metadata: Metadata = {
  title: 'Installation | Habitica Sync',
  description: 'Complete your setup',
  robots: {
    index: false,
    follow: false,
  },
};

const InstallationPage: NextPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-slate-400">
          <span className="animate-pulse">Loading setup...</span>
        </div>
      }
    >
      <InstallationForm />
    </Suspense>
  );
};

export default InstallationPage;
