'use client';

import { FC } from 'react';

import { HabiticaStats } from '@/app/actions/get-habitica-stats';
import { Card } from '@/components/ui/Card';
import { CardBody } from '@/components/ui/CardBody';
import { Heading } from '@/components/ui/Heading';

type HabiticaStatsCardProps = {
  stats: HabiticaStats | null;
};

export const HabiticaStatsCard: FC<HabiticaStatsCardProps> = ({ stats }) => {
  if (!stats) {
    return (
      <Card variant="flat" className="bg-slate-100 text-slate-500">
        <CardBody className="flex flex-col items-center justify-center py-8 text-center">
          <Heading level={3} size="base" className="mb-2 text-slate-700">
            No Data Available
          </Heading>
          <p className="text-xs">
            Connect your Habitica account to view your level and progress.
          </p>
        </CardBody>
      </Card>
    );
  }

  const progress = Math.min((stats.exp / stats.toNextLevel) * 100, 100);

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
            {Math.ceil(stats.hp)} / {stats.maxHealth} HP
          </div>
        </div>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-4xl font-bold tracking-tight">{stats.lvl}</span>
          <span className="mb-1.5 font-medium text-violet-200">Lvl</span>
        </div>

        <div className="relative mt-4 h-2.5 w-full overflow-hidden rounded-full bg-violet-900/50">
          <div
            className="h-full rounded-full bg-linear-to-r from-white/90 to-white transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-2 flex justify-between text-xs font-medium text-violet-200">
          <span>{Math.floor(stats.exp)} XP</span>
          <span>{stats.toNextLevel} XP to next</span>
        </div>
      </CardBody>
    </Card>
  );
};
