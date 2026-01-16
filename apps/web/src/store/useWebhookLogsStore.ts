import { create } from 'zustand';

import { getWebhookLogsAction } from '@/actions/webhookLogs/getWebhookLogsAction';
import { WebhookLogsModel } from '@/generated/prisma/models/WebhookLogs';

type WebhookLogsStoreState = {
  webhookLogs: WebhookLogsModel[];
  isLoading: boolean;
  fetchWebhookLogs: () => Promise<void>;
};

export const useWebhookLogsStore = create<WebhookLogsStoreState>(set => ({
  webhookLogs: [],
  isLoading: false,
  fetchWebhookLogs: async () => {
    set({ isLoading: true });

    try {
      const result = await getWebhookLogsAction();

      if (result.success && result.data) {
        set({ webhookLogs: result.data });
      } else {
        console.error('Failed to fetch webhook logs:', result.error);
      }
    } catch (error) {
      console.error('Zustand fetchWebhookLogs error:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
