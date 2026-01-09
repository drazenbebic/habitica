import { PullRequestEvent } from '@octokit/webhooks-types';

import { TaskDirection, TaskPriority, TaskType } from '../enums';
import getHabiticaApi from '../get-habitica-api';
import getTaskByName from '../get-task-by-name';

export const pullRequestClosedHandler = async ({
  installation,
  pull_request: pullRequest,
  repository,
  sender,
}: PullRequestEvent) => {
  console.info('[pull_request.closed]: Event triggered.');

  if (!installation?.id) {
    console.info('[pull_request.closed]: Installation is missing.');
    return;
  }

  const isFeature = pullRequest.title.startsWith('feat');
  const isFix = pullRequest.title.startsWith('fix');

  const habiticaApi = await getHabiticaApi(installation.id, sender.login);

  if (!habiticaApi) {
    console.info('[pull_request.closed]: Habitica user is missing.');
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
};
