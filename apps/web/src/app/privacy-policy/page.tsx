import { NextPage } from 'next';
import { Metadata } from 'next';
import Link from 'next/link';

import { Content } from '@/components/ui/Content';
import { Heading } from '@/components/ui/Heading';

export const metadata: Metadata = {
  title: 'Privacy Policy | Habitica Sync',
  description:
    'We protect your code and data. Learn about our GDPR compliance, zero-storage policy for source code, and secure infrastructure in Frankfurt.',
};

const PrivacyPolicy: NextPage = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-20">
      <div className="mb-10 border-b border-slate-200 pb-8">
        <Heading level={1} className="mb-4">
          Privacy Policy
        </Heading>
        <Content size="lg">Last updated: 09.01.2026</Content>
      </div>

      <div className="flex flex-col gap-10">
        {/* 1. Introduction */}
        <section>
          <Heading level={2} size="xl" className="mb-4">
            1. Introduction
          </Heading>
          <Content>
            We respect your privacy and are committed to protecting your
            personal data. This privacy policy will inform you as to how we look
            after your personal data when you use our GitHub App and website,
            and tell you about your privacy rights.
          </Content>
        </section>

        {/* 2. Controller */}
        <section>
          <Heading level={2} size="xl" className="mb-4">
            2. Controller
          </Heading>
          <Content className="mb-2">
            The data controller responsible for this website is:
          </Content>
          <div className="rounded-2xl bg-slate-50 p-6 text-slate-700">
            <Content className="font-semibold">Drazen Bebic</Content>
            <Content>Postfach 0029 1190 Vienna, Austria</Content>
            <Content>Email: habitica@bebic.dev</Content>
          </div>
        </section>

        {/* 3. Data We Collect */}
        <section>
          <Heading level={2} size="xl" className="mb-4">
            3. The Data We Collect
          </Heading>
          <Content className="mb-4">
            To provide the gamification service, we process the following data:
          </Content>
          <ul className="list-disc space-y-2 pl-5 text-slate-600">
            <Content as="li">
              <strong>GitHub Account Data:</strong> Username, Avatar, and GitHub
              User ID (via NextAuth).
            </Content>
            <Content as="li">
              <strong>Habitica Credentials:</strong> Your Habitica User ID and
              API Token. These are stored encrypted in our database.
            </Content>
            <Content as="li">
              <strong>Webhook Data:</strong> Metadata about your GitHub activity
              (commits, pull requests, issue comments). <br />
              <span className="text-sm font-semibold text-violet-600">
                Important: We do not access, read, or store your source code
                files.
              </span>
            </Content>
          </ul>
        </section>

        {/* 4. Infrastructure & Processors */}
        <section>
          <Heading level={2} size="xl" className="mb-4">
            4. Infrastructure & Data Processors
          </Heading>
          <Content className="mb-4">
            We use strictly selected third-party service providers to host our
            application and store data.
          </Content>

          <div className="space-y-6">
            <div>
              <Heading level={3} size="lg" className="mb-2">
                4.1. Hosting (Vercel)
              </Heading>
              <Content>
                Our website and API functions are hosted on{' '}
                <strong>Vercel Inc.</strong> (USA). Vercel processes standard
                server logs (IP addresses, user agents) for security and
                debugging purposes. Vercel complies with GDPR via standard
                contractual clauses.
              </Content>
            </div>

            <div>
              <Heading level={3} size="lg" className="mb-2">
                4.2. Database (Neon)
              </Heading>
              <Content>
                Our database is provided by <strong>Neon Inc.</strong> We have
                configured our database instance to reside in the{' '}
                <strong>AWS Frankfurt (eu-central-1)</strong> region to ensure
                your data remains within the EU/EEA.
              </Content>
            </div>

            <div>
              <Heading level={3} size="lg" className="mb-2">
                4.3. Habitica API
              </Heading>
              <Content>
                To score your habits, we transmit command data (e.g., &#34;Score
                Up Task X&#34;) to the <strong>Habitica API</strong>. This is
                necessary for the core functionality of the app.
              </Content>
            </div>
          </div>
        </section>

        {/* 5. User Rights */}
        <section>
          <Heading level={2} size="xl" className="mb-4">
            5. Your Rights (GDPR)
          </Heading>
          <Content className="mb-4">
            Under the GDPR, you have the following rights:
          </Content>
          <ul className="list-disc space-y-1 pl-5">
            <Content as="li">Right to access your stored data.</Content>
            <Content as="li">
              Right to rectification (update your keys).
            </Content>
            <Content as="li">
              Right to erasure (delete your account via the dashboard).
            </Content>
            <Content as="li">
              Right to restrict processing (revoke GitHub App access).
            </Content>
          </ul>
        </section>

        {/* 6. Contact */}
        <section className="rounded-3xl bg-violet-50 p-8 text-center">
          <Heading level={2} size="lg" className="mb-2 text-violet-900">
            Questions?
          </Heading>
          <Content className="mb-4 text-violet-800">
            If you have any questions about this policy, please contact us at:
          </Content>
          <Link
            href="mailto:habitica@bebic.dev"
            className="font-bold text-violet-600 hover:underline"
          >
            habitica@bebic.dev
          </Link>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
