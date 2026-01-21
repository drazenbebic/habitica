import { Metadata } from 'next';

import { generatePageMetadata } from '@/utils/seo';

export const generateMetadata = async (): Promise<Metadata> => {
  return generatePageMetadata({
    title: 'Triggers',
    description:
      'Configure automated rewards for your GitHub activity. Define how much XP and Gold you earn for commits, pull requests, and code reviews.',
    suffix: 'Octogriffin Dashboard',
    path: 'dashboard',
  });
};

export default function DashboardPage() {
  return null;
}
