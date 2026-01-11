import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import getHabiticaApi from '@/app/api/v1/webhook/get-habitica-api';
import getTaskByName from '@/app/api/v1/webhook/get-task-by-name';
import { TaskDirection, TaskPriority, TaskType } from '@/enums/habitica';
import logger from '@/lib/logger';

export const handlePullRequestClosed = async ({
  payload: { installation, pull_request: pullRequest, repository, sender },
}: EmitterWebhookEvent<'pull_request.closed'>) => {
  logger.info('Event triggered.');

  if (!installation?.id) {
    logger.info('Installation is missing.');
    return;
  }

  const isFeature = pullRequest.title.startsWith('feat');
  const isFix = pullRequest.title.startsWith('fix');

  const habiticaApi = await getHabiticaApi(installation.id, sender.login);

  if (!habiticaApi) {
    logger.info('Habitica user is missing.');
    return;
  }

  const taskName = `Merged a ${isFeature ? 'feature' : 'bug fix'} branch in the "${repository.name}" repository`;
  const existingTask = await getTaskByName(habiticaApi, taskName);
  const task = existingTask
    ? existingTask
    : await habiticaApi.createTask({
        text: taskName,
        type: TaskType.HABIT,
        value: isFeature ? 5 : isFix ? 3 : 1,
        priority: isFeature ? TaskPriority.HIGH : TaskPriority.NORMAL,
      });

  await habiticaApi.scoreTask(task.id, TaskDirection.UP);

  logger.info('Event processed.');
};
