'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import {
  deleteWebhookTrigger,
  getWebhookTrigger,
} from '@/accessors/webhookTrigger';
import { authOptions } from '@/lib/auth';

export async function deleteWebhookTriggerAction(triggerUuid: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    throw new Error('Unauthorized');
  }

  const githubUser = await getGithubUserUserByLogin(session.user.name);

  if (!githubUser) {
    throw new Error('User not found');
  }

  const trigger = await getWebhookTrigger(triggerUuid, githubUser.id);

  if (!trigger) {
    throw new Error('Trigger not found');
  }

  await deleteWebhookTrigger(triggerUuid, githubUser.id);

  revalidatePath('/dashboard');
}
