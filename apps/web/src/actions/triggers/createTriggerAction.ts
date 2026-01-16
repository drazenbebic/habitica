'use server';

import { getServerSession } from 'next-auth';

import { nanoid } from 'nanoid';

import { getGithubUserUserByLogin } from '@/accessors/githubUser';
import { createTrigger } from '@/accessors/trigger';
import { TriggersModel } from '@/generated/prisma/models/Triggers';
import { authOptions } from '@/lib/auth';
import { TriggerSchema, triggerSchema } from '@/schemas/triggerSchema';
import { ServerActionResult } from '@/types/serverAction';

export async function createTriggerAction(
  data: TriggerSchema,
): Promise<ServerActionResult<TriggersModel>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.name) {
      return { success: false, error: 'Unauthorized' };
    }

    const parsed = triggerSchema.safeParse(data);

    if (!parsed.success) {
      return { success: false, error: 'Invalid form data provided.' };
    }

    const githubUser = await getGithubUserUserByLogin(session.user.name);

    if (!githubUser) {
      return { success: false, error: 'GitHub user account not found.' };
    }

    const slug = parsed.data.taskTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const taskAlias = `octogriffin-${slug}-${nanoid(8)}`;

    const newTrigger = await createTrigger({
      githubUserId: githubUser.id,
      isActive: true,
      event: parsed.data.event,
      taskAlias: taskAlias,
      taskTitle: parsed.data.taskTitle,
      taskNote: parsed.data.taskNote,
      scoreDirection: parsed.data.scoreDirection,
      taskPriority: parsed.data.taskPriority,
      taskAttribute: parsed.data.taskAttribute,
      taskFrequency: parsed.data.taskFrequency,
    });

    if (!newTrigger) {
      return {
        success: false,
        error: 'Database error: Failed to create trigger.',
      };
    }

    return { success: true, data: newTrigger };
  } catch (error) {
    console.error('createTriggerAction Error:', error);

    return {
      success: false,
      error: 'An unexpected error occurred. Please try again later.',
    };
  }
}
