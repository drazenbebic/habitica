'use server';

import { getServerSession } from 'next-auth';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import { authOptions } from '@/lib/auth';
import HabiticaApi from '@/lib/HabiticaApi';
import logger from '@/lib/logger';
import { UserStats } from '@/types/habitica';

export async function getHabiticaStatsAction(): Promise<UserStats | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return null;
  }

  const user = await getGithubUserUserByLogin(session.user.name, {
    habiticaUser: true,
  });

  if (!user?.habiticaUser?.userId || !user?.habiticaUser?.apiToken) {
    return null;
  }

  try {
    const habitica = new HabiticaApi(
      user.habiticaUser.userId,
      user.habiticaUser.apiToken,
    );

    const { stats } = await habitica.getUserStats();

    return stats;
  } catch (error) {
    logger.error({ error }, 'Failed to fetch Habitica stats:');
    return null;
  }
}
