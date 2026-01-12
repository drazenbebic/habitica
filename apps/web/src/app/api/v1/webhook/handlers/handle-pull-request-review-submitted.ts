import { EmitterWebhookEvent } from '@octokit/webhooks';

import getHabiticaApi from '@/app/api/v1/webhook/get-habitica-api';
import { TaskDirection, TaskPriority, TaskType } from '@/enums/habitica';
import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handlePullRequestReviewSubmitted = async ({
  payload: { installation, repository, sender, pull_request: pullRequest },
}: EmitterWebhookEvent<'pull_request_review.submitted'>) => {
  if (!installation?.id || !repository) {
    logger.info('Ignored: Missing installation or repository.');
    return;
  }

  if (pullRequest?.user?.id === sender.id) {
    logger.info('Ignored: User reviewed their own Pull Request.');
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
      { repoId: repository.id },
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

  const taskName = `Reviewed a Pull Request in the "${repository.name}" repository`;

  try {
    const tasks = await habiticaApi.getTasks();
    const existingTask = tasks.find(({ text }) => text === taskName);

    const task = existingTask
      ? existingTask
      : await habiticaApi.createTask({
          text: taskName,
          type: TaskType.HABIT,
          value: 5,
          priority: TaskPriority.HIGH,
        });

    await habiticaApi.scoreTask(task.id, TaskDirection.UP);
    logger.info('Event processed successfully.');
  } catch (error) {
    logger.error({ error }, 'Habitica API Error');
  }
};
