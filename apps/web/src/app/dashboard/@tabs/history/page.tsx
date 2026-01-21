import { Metadata } from 'next';

import { WebhookLogsList } from '@/components/dashboard/WebhookLogsList';
import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata({
    title: 'Webhook Logs',
    description:
      'Monitor incoming GitHub webhooks in real-time. Inspect event payloads, track delivery status, and troubleshoot your trigger executions.',
    suffix: 'Octogriffin Dashboard',
    path: 'dashboard/history',
  });
};

export default function DashboardHistoryPage() {
  return <WebhookLogsList />;
}
