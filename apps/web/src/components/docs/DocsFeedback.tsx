import { FC } from 'react';

import { GitPullRequestIcon } from 'hugeicons-react';

import { githubRepositoryUrl } from '@/utils/githubRepositoryUrl';

export const DocsFeedback: FC = () => (
  <div className="mt-12 rounded-2xl bg-violet-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex items-center gap-3 text-violet-900 font-medium">
      <GitPullRequestIcon size={24} />
      <span>Something went wrong?</span>
    </div>
    <a
      href={githubRepositoryUrl('/issues')}
      target="_blank"
      rel="noreferrer"
      className="text-sm font-bold text-violet-700 hover:text-violet-900 hover:underline"
    >
      Open an Issue on GitHub &rarr;
    </a>
  </div>
);
