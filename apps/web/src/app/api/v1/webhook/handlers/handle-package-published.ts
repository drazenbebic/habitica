import { EmitterWebhookEvent } from '@octokit/webhooks';

import getHabiticaApi from '@/app/api/v1/webhook/get-habitica-api';
import { TaskDirection, TaskPriority, TaskType } from '@/enums/habitica';
import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handlePackagePublished = async ({
  payload: { installation, package: githubPackage, sender, repository },
}: EmitterWebhookEvent<'package.published'>) => {
  if (!installation?.id || !repository) {
    logger.info('Ignored: Missing installation or repository.');
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

  const taskName = `Published a new version of the "${githubPackage.name}" package`;

  try {
    const tasks = await habiticaApi.getTasks();

    const task =
      tasks.find(t => t.text === taskName) ||
      (await habiticaApi.createTask({
        text: taskName,
        type: TaskType.HABIT,
        value: 3,
        priority: TaskPriority.LOW,
      }));

    await habiticaApi.scoreTask(task.id, TaskDirection.UP);

    logger.info('Event processed.');
  } catch (error) {
    logger.error({ error }, 'Habitica API Error');
  }
};
