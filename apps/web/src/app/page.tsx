import { Metadata, NextPage } from 'next';
import Link from 'next/link';

import {
  ArrowRight01Icon,
  CheckmarkCircle01Icon,
  GitCommitIcon,
  GithubIcon,
  GitMergeIcon,
  GitPullRequestIcon,
} from 'hugeicons-react';

import { RewardRow } from '@/components/RewardRow';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CardBody } from '@/components/ui/CardBody';
import { Content } from '@/components/ui/Content';
import { Heading } from '@/components/ui/Heading';

export const metadata: Metadata = {
  title: 'Habitica Sync - Gamify Your GitHub Workflow',
  description:
    'Level up your RPG character automatically while you code. Connect GitHub to Habitica and turn commits, PRs, and reviews into XP, Gold, and Loot.',
  openGraph: {
    title: 'Habitica Sync - Gamify Your GitHub Workflow',
    description:
      'Turn your code commits into RPG rewards. Open source and secure.',
  },
};

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="relative px-4 pt-20 sm:pt-32 text-center">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="mx-auto max-w-3xl flex flex-col items-center gap-6">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">
            <span className="flex h-2 w-2 rounded-full bg-violet-600 mr-2 animate-pulse"></span>
            v1.0 is now live
          </div>

          <Heading level={1} size="4xl">
            Turn your Commits into <br />
            <span className="text-violet-600">Gold and XP</span>
          </Heading>

          <Content size="lg" className="max-w-2xl text-center">
            Connect your GitHub Account to our Habitica App. Level up your
            character, find items, and slay monsters just by writing code.
          </Content>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="https://github.com/apps/habitica-integration"
              target="_blank"
            >
              <Button size="lg">
                Get Started
                <ArrowRight01Icon size={20} className="ml-2" />
              </Button>
            </Link>
            <Link
              href="https://github.com/drazenbebic/habitica"
              target="_blank"
            >
              <Button variant="secondary" size="lg">
                <GithubIcon size={20} className="mr-2" />
                Open Source
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4">
        <div className="mb-12 text-center">
          <Heading level={2} size="3xl">
            How it works
          </Heading>
          <Content className="mt-4">
            Simple, secure, and set-and-forget.
          </Content>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card variant="flat" className="bg-slate-50/50">
            <CardBody>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <GithubIcon size={24} />
              </div>
              <Heading level={3} size="lg">
                1. Install App
              </Heading>
              <Content size="sm">
                Install our GitHub App on your repositories. We only listen to
                webhooks. We never read your source code.
              </Content>
            </CardBody>
          </Card>

          <Card variant="flat" className="bg-slate-50/50">
            <CardBody>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                <CheckmarkCircle01Icon size={24} />
              </div>
              <Heading level={3} size="lg">
                2. Link Account
              </Heading>
              <Content size="sm">
                Sign in and add your Habitica API keys. Your data is encrypted
                and stored securely.
              </Content>
            </CardBody>
          </Card>

          <Card variant="flat" className="bg-slate-50/50">
            <CardBody>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                <GitMergeIcon size={24} />
              </div>
              <Heading level={3} size="lg">
                3. Get Rewards
              </Heading>
              <Content size="sm">
                Push code, merge PRs, or review code. Watch your character gain
                XP and Gold automatically.
              </Content>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4">
        <Card variant="elevated">
          <CardBody>
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-6">
              <div>
                <Heading level={2} size="xl">
                  Reward Rates
                </Heading>
                <Content size="sm">Default configuration</Content>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <RewardRow
                icon={<GitCommitIcon size={20} className="text-slate-500" />}
                action="Push Commit"
                reward="+1 XP"
              />
              <RewardRow
                icon={
                  <GitPullRequestIcon size={20} className="text-blue-500" />
                }
                action="Open Pull Request"
                reward="+2 XP"
              />
              <RewardRow
                icon={
                  <CheckmarkCircle01Icon
                    size={20}
                    className="text-emerald-500"
                  />
                }
                action="Review Code"
                reward="+3 XP"
              />
              <RewardRow
                icon={<GitMergeIcon size={20} className="text-violet-500" />}
                action="Merge Pull Request"
                reward="+5 XP"
              />
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
};

export default Home;
