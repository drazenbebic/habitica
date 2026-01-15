'use server';

import { getServerSession } from 'next-auth';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import { getTriggers } from '@/accessors/trigger';
import { authOptions } from '@/lib/auth';

export async function getTriggersAction() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return [];
  }

  const githubUser = await getGithubUserUserByLogin(session.user.name);

  if (!githubUser) {
    return [];
  }

  return getTriggers(githubUser.id);
}
