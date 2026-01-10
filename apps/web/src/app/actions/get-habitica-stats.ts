import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export type HabiticaStats = {
  lvl: number;
  exp: number;
  toNextLevel: number;
  mp: number;
  hp: number;
  maxHealth: number;
  maxMP: number;
};

export async function getHabiticaStats(): Promise<HabiticaStats | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) return null;

  const user = await prisma.githubUsers.findUnique({
    where: { login: session.user.name },
    include: { habiticaUser: true },
  });

  if (!user?.habiticaUser?.userId || !user?.habiticaUser?.apiToken) {
    return null;
  }

  const { userId, apiToken } = user.habiticaUser;

  try {
    const response = await fetch(
      'https://habitica.com/api/v3/user?userFields=stats',
      {
        headers: {
          'x-api-user': userId,
          'x-api-key': apiToken,
          'x-client': `${userId}-HabiticaSync`,
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) return null;

    const data = await response.json();

    return {
      lvl: data.data.stats.lvl,
      exp: data.data.stats.exp,
      toNextLevel: data.data.stats.toNextLevel,
      hp: data.data.stats.hp,
      maxHealth: data.data.stats.maxHealth,
      mp: data.data.stats.mp,
      maxMP: data.data.stats.maxMP,
    };
  } catch (error) {
    console.error('Failed to fetch Habitica stats:', error);
    return null;
  }
}
