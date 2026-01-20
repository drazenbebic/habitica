import { Metadata } from 'next';

import {
  CloudServerIcon,
  Database01Icon,
  GitPullRequestIcon,
  Globe02Icon,
  Layout01Icon,
  LockKeyIcon,
  Shield01Icon,
  ZapIcon,
} from 'hugeicons-react';

import { DocsFeedback } from '@/components/docs/DocsFeedback';
import { Alert } from '@/components/ui/Alert';
import { Content } from '@/components/ui/Content';
import { Heading } from '@/components/ui/Heading';

export const metadata: Metadata = {
  title: 'Architecture',
  description:
    'High-level overview of the Octogriffin technology stack, data flow, and security model.',
};

export default function ArchitecturePage() {
  return (
    <div className="max-w-3xl space-y-12 pb-20">
      {/* Header */}
      <div>
        <Heading level={1} className="mb-4">
          Architecture
        </Heading>
        <Content size="lg" className="text-slate-600">
          Octogriffin is a modern full-stack application built on the{' '}
          <strong>Next.js</strong> framework. It acts as a bridge between GitHub
          activity and Habitica gamification.
        </Content>
      </div>

      {/* Tech Stack Grid */}
      <section className="space-y-4">
        <Heading level={2} size="xl">
          Technology Stack
        </Heading>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Layout01Icon size={20} />
            </div>
            <h3 className="font-bold text-slate-900">App Router (Frontend)</h3>
            <p className="mt-1 text-sm text-slate-500">
              Next.js 16 using React Server Components. Styled with Tailwind CSS
              and Hugeicons.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CloudServerIcon size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Serverless Backend</h3>
            <p className="mt-1 text-sm text-slate-500">
              API Routes and Webhook handlers running on Vercel Serverless
              Functions.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Database01Icon size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Data Layer</h3>
            <p className="mt-1 text-sm text-slate-500">
              Neon (Serverless PostgreSQL) managed via Prisma ORM for type-safe
              database access.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <LockKeyIcon size={20} />
            </div>
            <h3 className="font-bold text-slate-900">Authentication</h3>
            <p className="mt-1 text-sm text-slate-500">
              NextAuth.js handling GitHub OAuth sessions and secure session
              management.
            </p>
          </div>
        </div>
      </section>

      {/* The Data Flow */}
      <section className="space-y-6">
        <Heading level={2} size="xl">
          Event Data Flow
        </Heading>
        <Content>
          The core of Octogriffin is the transformation of code activity into
          game stats. Here is the lifecycle of a typical event:
        </Content>

        <div className="relative space-y-8 pl-4 before:absolute before:left-10.75 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-slate-200">
          {/* Step 1 */}
          <div className="relative flex gap-6">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white shadow-md ring-4 ring-white">
              <GitPullRequestIcon size={24} />
            </div>
            <div className="pt-2">
              <h4 className="font-bold text-slate-900">GitHub Event</h4>
              <p className="text-sm text-slate-500">
                User pushes code or merges a PR. GitHub sends a POST payload to{' '}
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-medium">
                  /api/v1/webhook
                </code>
                .
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex gap-6">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 ring-4 ring-white">
              <Shield01Icon size={24} />
            </div>
            <div className="pt-2">
              <h4 className="font-bold text-slate-900">Security Check</h4>
              <p className="text-sm text-slate-500">
                The application validates the{' '}
                <code className="text-xs font-bold">X-Hub-Signature-256</code>{' '}
                header against our App Secret to ensure the request is
                legitimate.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex gap-6">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 ring-4 ring-white">
              <ZapIcon size={24} />
            </div>
            <div className="pt-2">
              <h4 className="font-bold text-slate-900">XP Calculation</h4>
              <p className="text-sm text-slate-500">
                The system parses the commit size, file types, and action type
                to calculate the appropriate Experience (XP) and Gold reward.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex gap-6">
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md ring-4 ring-white">
              <Globe02Icon size={24} />
            </div>
            <div className="pt-2">
              <h4 className="font-bold text-slate-900">Habitica Sync</h4>
              <p className="text-sm text-slate-500">
                Using the user&#39;s stored API credentials, Octogriffin sends a
                score task request to the Habitica API.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Details */}
      <section className="space-y-4">
        <Heading level={2} size="xl">
          Integration Model
        </Heading>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Heading level={3} size="base" className="mb-2">
              GitHub Actor
            </Heading>
            <Content size="sm">
              Octogriffin operates as a GitHub App. It does not use a user&#39;s
              personal access token. Instead, it acts on its own behalf with
              specific, granular permissions installed on repositories.
            </Content>
          </div>
          <div>
            <Heading level={3} size="base" className="mb-2">
              Habitica Agent
            </Heading>
            <Content size="sm">
              For Habitica, the app acts as a User Agent. We encrypt and store
              the user&#39;s API User ID and Token to make API calls that
              simulate the user completing a task.
            </Content>
          </div>
        </div>
      </section>

      <Alert variant="info" title="Scalability Note">
        In production, Vercel Functions have a timeout limit (usually 10-60s).
        For heavy processing loads, we leverage Next.js{' '}
        <code className="font-bold">after()</code> to handle non-critical DB
        logging asynchronously.
      </Alert>

      <DocsFeedback />
    </div>
  );
}
