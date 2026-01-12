import { toast } from 'sonner';

export const errorMap = {
  GithubAppNotInstalled: () => {
    toast.error('Access Denied', {
      description: 'You must install the GitHub App before logging in.',
      duration: 8000,
      action: {
        label: 'Install App',
        onClick: () =>
          window.open('https://github.com/apps/habitica-integration', '_blank'),
      },
    });
  },
};
