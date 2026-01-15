'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import {
  getWebhookTrigger,
  updateWebhookTrigger,
} from '@/accessors/webhookTrigger';
import {
  TriggerSchema,
  triggerSchema,
} from '@/components/dashboard/triggerSchema';
import { authOptions } from '@/lib/auth';

export async function updateWebhookTriggerAction(
  uuid: string,
  data: TriggerSchema,
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = triggerSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: 'Invalid data provided' };
  }

  try {
    const githubUser = await getGithubUserUserByLogin(session.user.name);

    if (!githubUser) {
      return { success: false, error: 'User configuration not found' };
    }

    const existingTrigger = await getWebhookTrigger(uuid, githubUser.id);

    if (!existingTrigger) {
      return { success: false, error: 'Trigger not found or access denied' };
    }

    await updateWebhookTrigger(
      { id: existingTrigger.id },
      {
        event: parsed.data.event,
        taskTitle: parsed.data.taskTitle,
        taskNote: parsed.data.taskNote,
        scoreDirection: parsed.data.scoreDirection,
        taskPriority: parsed.data.taskPriority,
        taskAttribute: parsed.data.taskAttribute,
        taskFrequency: parsed.data.taskFrequency,
      },
    );

    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error('[UPDATE_TRIGGER_ERROR]', error);
    return { success: false, error: 'Database error occurred' };
  }
}
