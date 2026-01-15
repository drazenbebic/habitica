'use client';

import { FC, startTransition, useActionState, useEffect } from 'react';

import { ZapIcon } from 'hugeicons-react';

import { getWebhookTriggersAction } from '@/app/actions/get-webhook-triggers-action';
import { WebhookTriggersListItem } from '@/components/dashboard/WebhookTriggersListItem';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { WebhookTriggersModel } from '@/generated/prisma/models/WebhookTriggers';

export type WebhookTriggersListProps = {
  onOpenCreateAction?: () => void;
  onOpenDeleteAction?: (trigger: WebhookTriggersModel) => void;
  onOpenEditAction?: (trigger: WebhookTriggersModel) => void;
};

export const WebhookTriggersList: FC<WebhookTriggersListProps> = ({
  onOpenCreateAction,
  onOpenDeleteAction,
  onOpenEditAction,
}) => {
  const [triggers, action, isPending] = useActionState(
    getWebhookTriggersAction,
    [],
  );

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, [action]);

  if (isPending) {
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
        <div className="mb-2 flex justify-end">
          <Button size="sm" onClick={onOpenCreateAction}>
            + New Trigger
          </Button>
        </div>
        {triggers.map(trigger => (
          <WebhookTriggersListItem
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
