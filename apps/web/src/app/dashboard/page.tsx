import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { GithubIcon, Settings01Icon } from 'hugeicons-react';

import { getConnectedRepos } from '@/app/actions/get-connected-repos';
import { getHabiticaCredentials } from '@/app/actions/get-habitica-credentials';
import { getHabiticaStats } from '@/app/actions/get-habitica-stats';
import { isConnected } from '@/app/actions/is-connected';
import { DashboardGate } from '@/components/DashboardGate';
import { HabiticaStatsCard } from '@/components/HabiticaStatsCard';
import { HabiticaUserForm } from '@/components/HabiticaUserForm';
import { RepoList } from '@/components/RepoList';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { CardBody } from '@/components/ui/CardBody';
import { Content } from '@/components/ui/Content';
import { Heading } from '@/components/ui/Heading';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Dashboard | Habitica Sync',
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
    return <DashboardGate />;
  }

  const [connected, credentials, repos, stats] = await Promise.all([
    isConnected(),
    getHabiticaCredentials(),
    getConnectedRepos(),
    getHabiticaStats(),
  ]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Heading level={1} size="3xl" className="mb-2">
            Dashboard
          </Heading>
          <Content>Manage your Habitica connection and repositories.</Content>
        </div>

        <Badge
          variant={connected ? 'success' : 'neutral'}
          size="md"
          hasDot
          pulsing={connected}
          className="px-4 py-2"
        >
          {connected ? 'Connected' : 'Not Connected'}
        </Badge>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card variant="elevated">
            <CardBody>
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                  <Settings01Icon size={20} />
                </div>
                <div>
                  <Heading level={2} size="lg">
                    Habitica Configuration
                  </Heading>
                  <Content size="sm">
                    Enter your API credentials to enable syncing.
                  </Content>
                </div>
              </div>

              <HabiticaUserForm initialData={credentials} />
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <HabiticaStatsCard stats={stats} />

          <Card variant="outlined" className="bg-slate-50">
            <CardBody>
              <div className="mb-4 flex items-center gap-2 text-slate-900">
                <GithubIcon size={20} />
                <Heading level={3} size="base">
                  Connected Repositories
                </Heading>
              </div>

              <RepoList repos={repos} />

              <Content size="sm" className="mt-4 text-slate-500">
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
