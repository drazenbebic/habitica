'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import { upsertHabiticaUser } from '@/accessors/habiticaUser';
import { authOptions } from '@/lib/auth';

export type UpdateHabiticaResult = {
  success: boolean;
  message?: string;
};

export async function updateHabiticaCredentialsAction(formData: {
  userId: string;
  apiToken: string;
}): Promise<UpdateHabiticaResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return { success: false, message: 'Unauthorized' };
  }

  try {
    const githubUser = await getGithubUserUserByLogin(session.user.name);

    if (!githubUser) {
      return { success: false, message: 'GitHub user not found' };
    }

    await upsertHabiticaUser(
      githubUser.id,
      {
        userId: formData.userId,
        apiToken: formData.apiToken,
      },
      {
        userId: formData.userId,
        apiToken: formData.apiToken,
      },
    );

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Failed to update credentials:', error);
    return { success: false, message: 'Database error' };
  }
}
