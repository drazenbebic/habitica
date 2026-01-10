'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export type UpdateHabiticaResult = {
  success: boolean;
  message?: string;
};

export async function updateHabiticaCredentials(formData: {
  userId: string;
  apiToken: string;
}): Promise<UpdateHabiticaResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const githubUser = await prisma.gitHubUsers.findUnique({
      where: { login: session.user.name },
    });

    if (!githubUser) {
      return { success: false, message: 'GitHub user not found' };
    }

    await prisma.habiticaUsers.upsert({
      where: {
        gitHubUserUuid: githubUser.uuid,
      },
      create: {
        userId: formData.userId,
        apiToken: formData.apiToken,
        gitHubUserUuid: githubUser.uuid,
      },
      update: {
        userId: formData.userId,
        apiToken: formData.apiToken,
      },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Failed to update credentials:', error);
    return { success: false, message: 'Database error' };
  }
}
