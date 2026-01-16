'use client';

import { FC, useEffect } from 'react';

import { Activity04Icon, RefreshIcon } from 'hugeicons-react';

import { WebhookLogsListItem } from '@/components/dashboard/WebhookLogsListItem';
import { ButtonIcon } from '@/components/ui/ButtonIcon';
import { Skeleton } from '@/components/ui/Skeleton';
import { useWebhookLogsStore } from '@/store/useWebhookLogsStore';

export const WebhookLogsList: FC = () => {
  const webhookLogs = useWebhookLogsStore(state => state.webhookLogs);
  const isLoading = useWebhookLogsStore(state => state.isLoading);
  const fetchWebhookLogs = useWebhookLogsStore(state => state.fetchWebhookLogs);

  useEffect(() => {
    fetchWebhookLogs();
  }, [fetchWebhookLogs]);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col gap-3">
        <div className="mb-2 flex justify-end">
          <Skeleton className="h-8 w-8" variant="circular" />
        </div>
        {[...Array(webhookLogs?.length || 5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
          >
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (webhookLogs.length > 0) {
    return (
      <div className="flex h-full flex-col gap-3">
        <div className="mb-2 flex justify-end">
          <ButtonIcon
            size="sm"
            variant="secondary"
            onClick={fetchWebhookLogs}
            aria-label="Refresh logs"
            title="Refresh logs"
          >
            <RefreshIcon size={16} />
          </ButtonIcon>
        </div>
        {webhookLogs.map(log => (
          <WebhookLogsListItem key={log.uuid} log={log} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="mb-2 flex justify-end">
        <ButtonIcon
          size="sm"
          variant="ghost"
          onClick={fetchWebhookLogs}
          aria-label="Refresh logs"
        >
          <RefreshIcon size={16} />
        </ButtonIcon>
      </div>
      <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-100">
          <Activity04Icon className="text-slate-400" size={24} />
        </div>
        <h3 className="mb-1 text-base font-semibold text-slate-900">
          No Activity Recorded
        </h3>
        <p className="max-w-sm text-sm text-slate-500">
          We haven&#39;t received any webhook events from GitHub for your
          account yet.
        </p>
      </div>
    </div>
  );
};
