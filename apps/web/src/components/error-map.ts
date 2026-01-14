import { toast } from 'sonner';

import { githubAppUrl } from '@/utils/github-app-url';

export const errorMap = {
  GithubAppNotInstalled: () => {
    toast.error('Access Denied', {
      description: 'You must install the GitHub App before logging in.',
      duration: 8000,
      action: {
        label: 'Install App',
        onClick: () => window.open(githubAppUrl(), '_blank'),
      },
    });
  },
};
