'use server';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import HabiticaApi from '@/lib/habitica-api';
import logger from '@/lib/logger';
import prisma from '@/lib/prisma';
import { UserStats } from '@/types/habitica';

export async function getHabiticaStats(): Promise<UserStats | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return null;
  }

  const user = await prisma.githubUsers.findUnique({
    where: { login: session.user.name },
    select: {
      habiticaUser: {
        select: { userId: true, apiToken: true },
      },
    },
  });

  if (!user?.habiticaUser?.userId || !user?.habiticaUser?.apiToken) {
    return null;
  }

  try {
    const habitica = new HabiticaApi(
      user.habiticaUser.userId,
      user.habiticaUser.apiToken,
    );

    const { stats } = await habitica.getUserStats({
      next: { revalidate: 60 },
    });

    return stats;
  } catch (error) {
    logger.error({ error }, 'Failed to fetch Habitica stats:');
    return null;
  }
}
