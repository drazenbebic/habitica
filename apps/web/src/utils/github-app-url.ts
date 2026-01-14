import { env } from 'process';

const GITHUB_APP_URL = env.NEXT_PUBLIC_GITHUB_APP_URL;

export const githubAppUrl = () => {
  return GITHUB_APP_URL!;
};
