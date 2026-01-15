'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import { deleteTrigger, getTrigger } from '@/accessors/trigger';
import { authOptions } from '@/lib/auth';

export async function deleteTriggerAction(triggerUuid: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    throw new Error('Unauthorized');
  }

  const githubUser = await getGithubUserUserByLogin(session.user.name);

  if (!githubUser) {
    throw new Error('User not found');
  }

  const trigger = await getTrigger(triggerUuid, githubUser.id);

  if (!trigger) {
    throw new Error('Trigger not found');
  }

  await deleteTrigger(triggerUuid, githubUser.id);

  revalidatePath('/dashboard');
}
