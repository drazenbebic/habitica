'use server';

import { revalidatePath } from 'next/cache';

import { updateTrigger } from '@/accessors/trigger';

export async function toggleTriggerAction(
  triggerUuid: string,
  isActive: boolean,
) {
  try {
    await updateTrigger({ uuid: triggerUuid }, { isActive });

    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Failed to toggle trigger:', error);
    throw new Error('Failed to update trigger status');
  }
}
