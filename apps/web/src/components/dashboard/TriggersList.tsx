'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import { RefreshIcon, ZapIcon } from 'hugeicons-react';
import { toast } from 'sonner';

import { getTriggersAction } from '@/actions/triggers/getTriggersAction';
import { TriggersListItem } from '@/components/dashboard/TriggersListItem';
import { Button } from '@/components/ui/Button';
import { ButtonIcon } from '@/components/ui/ButtonIcon';
import { Skeleton } from '@/components/ui/Skeleton';
import { TriggersModel } from '@/generated/prisma/models/Triggers';

export type TriggersListProps = {
  onOpenCreateAction?: () => void;
  onOpenDeleteAction?: (trigger: TriggersModel) => void;
  onOpenEditAction?: (trigger: TriggersModel) => void;
};

export const TriggersList: FC<TriggersListProps> = ({
  onOpenCreateAction,
  onOpenDeleteAction,
  onOpenEditAction,
}) => {
  const [triggers, setTriggers] = useState<TriggersModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTriggers = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getTriggersAction();
      setTriggers(data);
    } catch (error) {
      console.error('Failed to fetch triggers:', error);
      toast.error('Could not load triggers');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTriggers();
  }, [fetchTriggers]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 h-full">
        <div className="mb-2 flex justify-end">
          <Skeleton className="h-8 w-32" variant="circular" />
        </div>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex gap-3 items-center justify-between rounded-xl p-4 shadow-sm ring-1 ring-slate-100"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-1">
                <Skeleton className="h-6 w-32" />
                <div className="flex gap-2">
                  <Skeleton className="h-5.5 w-18" />
                  <Skeleton className="h-5.5 w-13" />
                  <Skeleton className="h-5.5 w-20" />
                </div>
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (triggers.length > 0) {
    return (
      <div className="flex flex-col gap-3 h-full">
        <div className="mb-2 flex items-center justify-end gap-2">
          <ButtonIcon
            size="sm"
            variant="secondary"
            onClick={fetchTriggers}
            aria-label="Refresh triggers list"
          >
            <RefreshIcon size={16} />
          </ButtonIcon>
          <Button size="sm" onClick={onOpenCreateAction}>
            + New Trigger
          </Button>
        </div>
        {triggers.map(trigger => (
          <TriggersListItem
            key={trigger.uuid}
            trigger={trigger}
            onOpenDeleteAction={onOpenDeleteAction}
            onOpenEditAction={onOpenEditAction}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex flex-col h-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100">
          <ZapIcon className="text-slate-400" size={24} />
        </div>
        <h3 className="mb-1 text-base font-semibold text-slate-900">
          No triggers defined
        </h3>
        <p className="mb-6 max-w-sm text-sm text-slate-500">
          Create your first trigger to start earning XP automatically when you
          push code.
        </p>
        <Button onClick={onOpenCreateAction}>Create Trigger</Button>
      </div>
    </div>
  );
};
