import { Metadata } from 'next';

import {
  CheckmarkCircle01Icon,
  GithubIcon,
  Settings01Icon,
} from 'hugeicons-react';

import { isConnected } from '@/app/actions/is-connected';
import { HabiticaUserForm } from '@/components/HabiticaUserForm';
import { Badge } from '@/components/ui/Badge'; // Using your new component
import { Card } from '@/components/ui/Card';
import { CardBody } from '@/components/ui/CardBody';
import { Content } from '@/components/ui/Content';
import { Heading } from '@/components/ui/Heading';

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
  const connected = await isConnected();

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
        {/* Left Column: Habitica Configuration */}
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

              <HabiticaUserForm />
            </CardBody>
          </Card>
        </div>

        {/* Right Column: GitHub Repositories */}
        <div className="flex flex-col gap-6">
          <Card variant="outlined" className="bg-slate-50">
            <CardBody>
              <div className="mb-4 flex items-center gap-2 text-slate-900">
                <GithubIcon size={20} />
                <Heading level={3} size="base">
                  Connected Repositories
                </Heading>
              </div>

              <div className="flex flex-col gap-3">
                {/* Mock Repository Item */}
                <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium text-slate-700">
                      habitica-sync
                    </span>
                  </div>
                  <CheckmarkCircle01Icon
                    size={16}
                    className="text-emerald-500"
                  />
                </div>

                {/* Empty State / CTA */}
                <a
                  href="https://github.com/apps/habitica-integration"
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-2 flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
                >
                  <span>+ Add Repository</span>
                </a>
              </div>

              <Content size="sm" className="mt-4 text-slate-500">
                Install the GitHub App on your repositories to start tracking
                commits.
              </Content>
            </CardBody>
          </Card>

          <Card variant="flat" className="bg-violet-600 text-white">
            <CardBody>
              <Heading level={3} size="base" className="text-white">
                Current Level
              </Heading>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-bold">12</span>
                <span className="mb-1 text-violet-200">Lvl</span>
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-violet-800">
                <div className="h-full w-[65%] rounded-full bg-white"></div>
              </div>
              <p className="mt-2 text-xs font-medium text-violet-200">
                1,250 / 2,000 XP to next level
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
