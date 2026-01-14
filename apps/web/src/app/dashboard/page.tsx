import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { GithubIcon, Settings01Icon } from 'hugeicons-react';

import { AuthGate } from '@/components/AuthGate';
import { DashboardHabiticaStatsCard } from '@/components/dashboard/DashboardHabiticaStatsCard';
import { DashboardHabiticaUserForm } from '@/components/dashboard/DashboardHabiticaUserForm';
import { DashboardIsConnected } from '@/components/dashboard/DashboardIsConnected';
import { DashboardRepositoryList } from '@/components/dashboard/DashboardRepositoryList';
import { Card } from '@/components/ui/Card';
import { CardBody } from '@/components/ui/CardBody';
import { Content } from '@/components/ui/Content';
import { Heading } from '@/components/ui/Heading';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Dashboard | Octogriffin',
  description:
    'Manage your Habitica API connections, configure repository webhooks, and track your gamification progress.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <AuthGate />;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Heading level={1} size="3xl" className="mb-2">
            Dashboard
          </Heading>
          <Content>Manage your Habitica connection and repositories.</Content>
        </div>

        <DashboardIsConnected />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card variant="elevated">
            <CardBody>
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                  <Settings01Icon size={20} />
                </div>
                <div>
                  <Heading level={2} size="lg">
                    Habitica Configuration
                  </Heading>
                  <Content size="sm">
                    Enter your Habitica API credentials to enable syncing. You
                    can find these in{' '}
                    <Link
                      className="mx-1 font-semibold text-violet-600 hover:underline hover:text-violet-700"
                      href="https://habitica.com/user/settings/siteData"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Habitica &gt; Settings &gt; API
                    </Link>
                    .
                  </Content>
                </div>
              </div>

              <DashboardHabiticaUserForm />
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <DashboardHabiticaStatsCard />

          <Card variant="outlined" className="bg-slate-50">
            <CardBody>
              <div className="mb-4 flex items-center gap-2 text-slate-900">
                <GithubIcon size={20} />
                <Heading level={3} size="base">
                  Connected Repositories
                </Heading>
              </div>

              <DashboardRepositoryList />

              <Content size="sm" className="mt-4">
                Install the GitHub App on your repositories to start tracking
                commits.
              </Content>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
