import { FC, ReactNode } from 'react';

export type RewardRowProps = {
  icon: ReactNode;
  action: string;
  reward: string;
};

export const RewardRow: FC<RewardRowProps> = ({ icon, action, reward }) => (
  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 transition-colors hover:bg-slate-100">
    <div className="flex items-center gap-3">
      {icon}
      <span className="font-medium text-slate-700">{action}</span>
    </div>
    <span className="rounded-lg bg-yellow-100 px-3 py-1 text-sm font-bold text-yellow-700">
      {reward}
    </span>
  </div>
);
