'use server';

import { getServerSession } from 'next-auth';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import { authOptions } from '@/lib/auth';

export async function getHabiticaCredentialsAction() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return null;
  }

  const user = await getGithubUserUserByLogin(session.user.name, {
    habiticaUser: true,
  });

  if (!user?.habiticaUser) {
    return null;
  }

  return {
    userId: user.habiticaUser.userId,
    apiToken: user.habiticaUser.apiToken,
  };
}
