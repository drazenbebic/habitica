'use server';

import { revalidatePath } from 'next/cache';

import { updateWebhookTrigger } from '@/accessors/webhookTrigger';

export async function toggleWebhookTriggerAction(
  triggerUuid: string,
  isActive: boolean,
) {
  try {
    await updateWebhookTrigger({ uuid: triggerUuid }, { isActive });

    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Failed to toggle trigger:', error);
    throw new Error('Failed to update trigger status');
  }
}
