import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import {
  TaskDirection,
  TaskPriority,
  TaskType,
} from '@/app/api/v1/webhook/enums';
import getHabiticaApi from '@/app/api/v1/webhook/get-habitica-api';
import logger from '@/lib/logger';

export const handlePullRequestReviewSubmitted = async ({
  payload: { installation, repository, sender },
}: EmitterWebhookEvent<'pull_request_review.submitted'>) => {
  logger.info('Event triggered.');

  if (!installation?.id) {
    logger.info('Installation is missing.');
    return;
  }

  const habiticaApi = await getHabiticaApi(installation.id, sender.login);

  if (!habiticaApi) {
    logger.info('Habitica user is missing.');
    return;
  }

  const taskName = `Review pull requests in the "${repository.name}" repository`;
  const tasks = await habiticaApi.getTasks();
  const existingTask = tasks.find(({ text }) => text === taskName);
  const task = existingTask
    ? existingTask
    : await habiticaApi.createTask({
        text: taskName,
        type: TaskType.HABIT,
        value: 3,
        priority: TaskPriority.HIGH,
      });

  await habiticaApi.scoreTask(task.id, TaskDirection.UP);
};
