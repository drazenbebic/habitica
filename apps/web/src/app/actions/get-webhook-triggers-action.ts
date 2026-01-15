'use server';

import { getServerSession } from 'next-auth';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import { getWebhookTriggers } from '@/accessors/webhookTrigger';
import { authOptions } from '@/lib/auth';

export async function getWebhookTriggersAction() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return [];
  }

  const githubUser = await getGithubUserUserByLogin(session.user.name);

  if (!githubUser) {
    return [];
  }

  return getWebhookTriggers(githubUser.id);
}
