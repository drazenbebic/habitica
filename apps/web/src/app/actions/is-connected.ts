'use server';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function isConnected() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return false;
  }

  try {
    const user = await prisma.githubUsers.findUnique({
      where: {
        login: session.user.name,
      },
      include: {
        installation: true,
        habiticaUser: true,
      },
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
