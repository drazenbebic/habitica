import { EmitterWebhookEvent } from '@octokit/webhooks';

import getHabiticaApi from '@/app/api/v1/webhook/get-habitica-api';
import getTaskByName from '@/app/api/v1/webhook/get-task-by-name';
import { TaskDirection, TaskPriority, TaskType } from '@/enums/habitica';
import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handlePullRequestClosed = async ({
  payload: { installation, pull_request: pullRequest, repository, sender },
}: EmitterWebhookEvent<'pull_request.closed'>) => {
  if (!installation?.id || !repository) {
    logger.info('Ignored: Missing installation or repository.');
    return;
  }

  if (!pullRequest.merged) {
    logger.info('Ignored: Pull Request closed without merging.');
    return;
  }

  const githubInstallation = await prisma.githubInstallations.findUnique({
    where: { installationId: installation.id },
    select: {
      suspended: true,
      selectedRepositories: {
        where: { githubRepositoryId: repository.id },
        select: { id: true },
        take: 1,
      },
    },
  });

  if (!githubInstallation) {
    logger.info('Ignored: Installation not found.');
    return;
  }

  if (githubInstallation.suspended) {
    logger.info('Ignored: Installation is suspended.');
    return;
  }

  if (githubInstallation.selectedRepositories.length === 0) {
    logger.info(
      { repositoryId: repository.id },
      'Ignored: Repository not whitelisted.',
    );
    return;
  }

  const githubUser = await prisma.githubUsers.findUnique({
    where: { githubId: sender.id },
    select: { habiticaUser: true },
  });

  if (!githubUser?.habiticaUser) {
    logger.warn('Ignored: Sender not linked to Habitica.');
    return;
  }

  const habiticaApi = await getHabiticaApi(installation.id, sender.login);

  if (!habiticaApi) {
    logger.error('Habitica API initialization failed.');
    return;
  }

  const taskName = `Merged a Pull Request in the "${repository.name}" repository`;

  try {
    const existingTask = await getTaskByName(habiticaApi, taskName);

    const task = existingTask
      ? existingTask
      : await habiticaApi.createTask({
          text: taskName,
          type: TaskType.HABIT,
          value: 3,
          priority: TaskPriority.NORMAL,
        });

    await habiticaApi.scoreTask(task.id, TaskDirection.UP);
    logger.info('Event processed.');
  } catch (error) {
    logger.error({ error }, 'Habitica API Error');
  }
};
