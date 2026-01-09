import { FC, ReactNode } from 'react';

import { Badge } from '@/components/ui/Badge';

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
    <Badge variant="warning" size="md">
      {reward}
    </Badge>
  </div>
);
