'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import { createWebhookTrigger } from '@/accessors/webhookTrigger';
import {
  TriggerSchema,
  triggerSchema,
} from '@/components/dashboard/triggerSchema';
import { authOptions } from '@/lib/auth';

export async function createWebhookTriggerAction(data: TriggerSchema) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return { success: false, error: 'Unauthorized' };
  }

  const parsed = triggerSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: 'Invalid data' };
  }

  try {
    const githubUser = await getGithubUserUserByLogin(session.user.name);

    if (!githubUser) {
      return { success: false, error: 'User not found' };
    }

    const slug = parsed.data.taskTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const taskAlias = `${slug}-${Math.random().toString(36).substring(2, 7)}`;

    await createWebhookTrigger({
      githubUserId: githubUser.id,
      isActive: true,
      event: parsed.data.event,
      taskAlias: taskAlias,
      taskTitle: parsed.data.taskTitle,
      taskNote: parsed.data.taskNote,
      scoreDirection: parsed.data.scoreDirection,
      taskPriority: parsed.data.taskPriority,
      taskAttribute: parsed.data.taskAttribute,
      taskFrequency: parsed.data.taskFrequency,
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Database error' };
  }
}
