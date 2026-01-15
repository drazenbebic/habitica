import { Metadata } from 'next';
import Link from 'next/link';

import { HelpCircleIcon, Mail01Icon } from 'hugeicons-react';

import { Accordion } from '@/components/ui/Accordion';
import { AccordionGroup } from '@/components/ui/AccordionGroup';
import { Button } from '@/components/ui/Button';
import { Content } from '@/components/ui/Content';
import { Heading } from '@/components/ui/Heading';
import { supportEmail } from '@/utils/support-email';

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Common questions about how Octogriffin processes your GitHub activity and rewards you.',
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100 text-violet-600">
          <HelpCircleIcon size={32} />
        </div>
        <Heading level={1} size="3xl" className="mb-4">
          Frequently Asked Questions
        </Heading>
        <Content size="lg" className="mx-auto max-w-xl">
          Everything you need to know about the syncing process, XP
          calculations, and security.
        </Content>
      </div>

      <AccordionGroup className="mb-16">
        <Accordion title="How exactly does the syncing work?">
          <Content className="mb-4">
            We use GitHub Webhooks to listen for activity on your connected
            repositories. When you push code, open a pull request, or close an
            issue, GitHub notifies our servers.
          </Content>
          <Content>
            We then analyze the event metadata (like commit size or issue
            complexity) to calculate a fair XP reward. Finally, we use the
            Habitica API to score a custom task on your account, instantly
            granting you Gold and Experience.
          </Content>
        </Accordion>

        <Accordion title="Is my private code safe?">
          <Content className="mb-4">
            <strong>Absolutely.</strong> We take security seriously. Our
            integration requests the minimum permissions required to function.
          </Content>
          <Content>
            We primarily look at event metadata (timestamps, commit messages,
            file counts). We do not store your source code, and we do not have
            write access to your code content - only the ability to read
            metadata to verify activity.
          </Content>
        </Accordion>

        <Accordion title="Why didn't I receive XP for my last commit?">
          <Content className="mb-4">
            There are a few common reasons for this:
          </Content>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Connection Status:</strong> Ensure your Habitica User ID
              and API Token are correct in the Dashboard.
            </li>
            <li>
              <strong>Repo Configuration:</strong> Verify that the repository
              you pushed to is actually installed in the GitHub App settings.
            </li>
          </ul>
        </Accordion>

        <Accordion title="Can I customize how much XP I get?">
          <Content>
            Currently, we use a <strong>fixed reward structure</strong> for
            every contribution. We are working on a future &#34;Difficulty
            Multiplier&#34; update that will allow you to customize these values
            and set specific repositories to &#34;Hard&#34; mode for greater
            challenges and rewards.
          </Content>
        </Accordion>

        <Accordion title="What happens if I work on multiple branches?">
          <Content>
            We track activity across all branches! However, to prevent
            double-dipping, we usually reward the initial commit push. Merging a
            branch into <code>main</code> does not grant duplicate XP for the
            same commits, but the Pull Request action itself generates a
            separate &#34;Task Completion&#34; reward.
          </Content>
        </Accordion>

        <Accordion title="Is this free to use?">
          <Content>
            Yes! Octogriffin is a passion project built by developers, for
            developers. It is currently free to use. In the future, we may
            introduce a premium tier for advanced analytics or team features,
            but the core syncing will always remain free.
          </Content>
        </Accordion>
      </AccordionGroup>

      <div className="rounded-3xl bg-slate-50 p-8 text-center ring-1 ring-slate-100">
        <Heading level={3} size="lg" className="mb-3">
          Still have questions?
        </Heading>
        <Content className="mb-6">
          Can&#39;t find the answer you&#39;re looking for? Our support team is
          ready to assist.
        </Content>
        <Link href={`mailto:${supportEmail()}`}>
          <Button size="lg" variant="secondary">
            <Mail01Icon size={20} className="mr-2" />
            Contact Support
          </Button>
        </Link>
      </div>
    </div>
  );
}
