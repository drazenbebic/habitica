import { ReactNode } from 'react';

import {
  BookOpen01Icon,
  CodeCircleIcon,
  GitPullRequestIcon,
  Globe02Icon,
  Settings02Icon,
} from 'hugeicons-react';

export type DocsNavItem = {
  title: string;
  href: string;
  icon?: ReactNode;
};

export type DocsNavSection = {
  title: string;
  items: DocsNavItem[];
};

export const docsNavigation: DocsNavSection[] = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/docs',
        icon: <BookOpen01Icon size={18} />,
      },
      {
        title: 'Development Setup',
        href: '/docs/dev-setup',
        icon: <Settings02Icon size={18} />,
      },
      {
        title: 'Setting up ngrok',
        href: '/docs/setting-up-ngrok',
        icon: <Globe02Icon size={18} />,
      },
    ],
  },
  {
    title: 'Contribution',
    items: [
      {
        title: 'How to Contribute',
        href: '/docs/how-to-contribute',
        icon: <GitPullRequestIcon size={18} />,
      },
      {
        title: 'Architecture',
        href: '/docs/architecture',
        icon: <CodeCircleIcon size={18} />,
      },
    ],
  },
];
