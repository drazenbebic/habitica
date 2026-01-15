'use client';

import { FC, startTransition, useActionState, useEffect, useMemo } from 'react';

import { getHabiticaStatsAction } from '@/app/actions/getHabiticaStatsAction';
import { Card } from '@/components/ui/Card';
import { CardBody } from '@/components/ui/CardBody';
import { Heading } from '@/components/ui/Heading';

export const HabiticaStatsCard: FC = () => {
  const [stats, action, isPending] = useActionState(
    getHabiticaStatsAction,
    null,
  );

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, [action]);

  const progress = useMemo(() => {
    if (!stats) {
      return 0;
    }

    return Math.min((stats.exp / stats.toNextLevel) * 100, 100);
  }, [stats]);

  if (!stats) {
    return (
      <Card variant="flat" className="bg-slate-100 text-slate-500">
        <CardBody className="flex flex-col items-center justify-center py-8 text-center">
          {isPending ? (
            <div className="animate-pulse">Loading stats...</div>
          ) : (
            <>
              <Heading level={3} size="base" className="mb-2 text-slate-700">
                No Data Available
              </Heading>
              <p className="text-xs">
                Connect your Habitica account to view your level and progress.
              </p>
            </>
          )}
        </CardBody>
      </Card>
    );
  }

  const xp = Math.floor(stats?.exp || 0);
  const toNextLevel = stats?.toNextLevel || 100;
  const hp = Math.ceil(stats?.hp || 1);
  const maxHealth = stats?.maxHealth || 100;
  const lvl = stats?.lvl || 1;

  return (
    <Card
      variant="flat"
      className="bg-violet-600 text-white shadow-violet-900/20 shadow-lg"
    >
      <CardBody>
        <div className="flex items-start justify-between">
          <Heading level={3} size="base" className="text-white/90">
            Current Level
          </Heading>

          <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-1 text-[10px] font-medium backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400"></span>
            {hp} / {maxHealth} HP
          </div>
        </div>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-4xl font-bold tracking-tight">{lvl}</span>
          <span className="mb-1.5 font-medium text-violet-200">Lvl</span>
        </div>

        <div className="relative mt-4 h-2.5 w-full overflow-hidden rounded-full bg-violet-900/50">
          <div
            className="h-full rounded-full bg-linear-to-r from-white/90 to-white transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs font-medium text-violet-200">
          <span>{xp} XP</span>
          <span>{toNextLevel} XP to next</span>
        </div>
      </CardBody>
    </Card>
  );
};
