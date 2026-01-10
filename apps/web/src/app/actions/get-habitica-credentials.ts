'use server';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function getHabiticaCredentials() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return null;
  }

  const user = await prisma.githubUsers.findUnique({
    where: {
      login: session.user.name,
    },
    include: {
      habiticaUser: true,
    },
  });

  if (!user?.habiticaUser) {
    return null;
  }

  return {
    userId: user.habiticaUser.userId,
    apiToken: user.habiticaUser.apiToken,
  };
}
