'use client';

import {
  FC,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from 'react';
import Link from 'next/link';

import clsx from 'clsx';
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  CheckmarkCircle01Icon,
} from 'hugeicons-react';

import { getConnectedRepos } from '@/app/actions/get-connected-repos';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export const DashboardRepositoryList: FC = () => {
  const [repos, action, isPending] = useActionState(getConnectedRepos, []);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, [action]);

  const MAX_VISIBLE = 5;
  const visibleRepos = isExpanded ? repos : repos.slice(0, MAX_VISIBLE);
  const hasHiddenItems = repos.length > MAX_VISIBLE;

  return (
    <div className="flex flex-col gap-3">
      {isPending ? (
        <>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="h-2 w-2 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
          ))}
        </>
      ) : repos.length > 0 ? (
        <>
          {visibleRepos.map(repo => (
            <div
              key={repo.id}
              className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className={clsx('h-2 w-2 shrink-0 rounded-full', {
                    'bg-amber-500': repo.private,
                    'bg-emerald-500': !repo.private,
                  })}
                  title={repo.private ? 'Private' : 'Public'}
                />
                <span className="truncate text-sm font-medium text-slate-700">
                  {repo.name}
                </span>
              </div>
              <a
                href={repo.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-violet-600"
              >
                <CheckmarkCircle01Icon size={16} className="text-emerald-500" />
              </a>
            </div>
          ))}

          {hasHiddenItems && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 w-full text-slate-500"
            >
              {isExpanded ? (
                <>
                  <ArrowUp01Icon size={16} className="mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ArrowDown01Icon size={16} className="mr-2" />
                  Show {repos.length - MAX_VISIBLE} More
                </>
              )}
            </Button>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center text-sm text-slate-500">
          No repositories found in this installation.
        </div>
      )}

      <Link
        href="https://github.com/apps/habitica-integration"
        target="_blank"
        rel="noreferrer"
        className="group mt-2 flex items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 py-3 text-sm font-medium text-slate-500 transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
      >
        <span>+ Manage Repositories</span>
      </Link>
    </div>
  );
};
