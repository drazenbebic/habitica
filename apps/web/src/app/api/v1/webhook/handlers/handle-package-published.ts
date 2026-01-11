import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import getHabiticaApi from '@/app/api/v1/webhook/get-habitica-api';
import { TaskDirection, TaskPriority, TaskType } from '@/enums/habitica';
import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handlePackagePublished = async ({
  payload: { installation, package: githubPackage, sender },
}: EmitterWebhookEvent<'package.published'>) => {
  logger.info('Event triggered.');

  if (!installation?.id) {
    logger.info('Installation is missing.');
    return;
  }

  const githubUser = await prisma.githubUsers.findUnique({
    where: { githubId: sender.id },
    include: {
      habiticaUser: true,
    },
  });

  if (!githubUser?.habiticaUser) {
    logger.error('Sender or Habitica connection could not be identified.');
    return;
  }

  const habiticaApi = await getHabiticaApi(installation.id, sender.login);

  if (!habiticaApi) {
    logger.info('Habitica API initialization failed.');
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
  } catch (error) {
    logger.error({ error }, 'Habitica API Error');
  }

  logger.info('Event processed.');
};
