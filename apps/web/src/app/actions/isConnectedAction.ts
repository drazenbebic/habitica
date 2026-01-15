'use server';

import { getServerSession } from 'next-auth';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import { authOptions } from '@/lib/auth';

export async function isConnectedAction() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return false;
  }

  try {
    const user = await getGithubUserUserByLogin(session.user.name, {
      installation: true,
      habiticaUser: true,
    });

    if (
      !user ||
      !user.habiticaUser ||
      !user.installation ||
      user.installation.suspended
    ) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to check connection status:', error);
    return false;
  }
}
