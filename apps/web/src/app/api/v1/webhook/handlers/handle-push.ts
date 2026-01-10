import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import getHabiticaApi from '@/app/api/v1/webhook/get-habitica-api';
import { TaskDirection, TaskPriority, TaskType } from '@/enums/habitica';
import logger from '@/lib/logger';

export const handlePush = async ({
  payload: { commits, repository, installation },
}: EmitterWebhookEvent<'push'>) => {
  logger.info('Event triggered.');

  if (!installation?.id) {
    logger.info('Installation is missing.');
    return;
  }

  const validCommits = commits.filter(
    ({ author }) => author.username !== 'dependabot[bot]',
  );

  if (validCommits.length <= 0) {
    logger.info({ commits }, 'All commits skipped.');
    return;
  }

  const taskName = `Push commits to the "${repository.name}" repository`;

  for (const commit of validCommits) {
    if (!commit.author?.username) {
      logger.info('Author username missing. Commit skipped.');
      continue;
    }

    const habiticaApi = await getHabiticaApi(
      installation.id,
      commit.author.username,
    );

    if (!habiticaApi) {
      logger.info('Habitica user missing. Commit skipped.');
      continue;
    }

    const tasks = await habiticaApi.getTasks();
    const existingTask = tasks.find(task => task.text === taskName);
    const task = existingTask
      ? existingTask
      : await habiticaApi.createTask({
          text: taskName,
          type: TaskType.HABIT,
          value: 1,
          priority: TaskPriority.LOW,
        });

    await habiticaApi.scoreTask(task.id, TaskDirection.UP);
  }
};
