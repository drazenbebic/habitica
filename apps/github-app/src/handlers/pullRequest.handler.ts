import { PullRequestEvent } from '@octokit/webhooks-types';
import { getTaskByName } from '../utils';
import {
  TaskDirection,
  TaskPriority,
  TaskType,
  createTask,
  scoreTask,
} from '@habitica/api';

const pullRequestHandler = async (
  deliveryUuid: string,
  hookId: string,
  { action, pull_request: pullRequest, repository }: PullRequestEvent,
) => {
  if (action !== 'closed') {
    return;
  }

  const isFeature = pullRequest.title.startsWith('feat');
  const isBugFix = pullRequest.title.startsWith('fix');

  if (!isFeature && !isBugFix) {
    return;
  }

  const taskName = `Merged a ${isFeature ? 'feature' : 'bug fix'} branch in the "${repository.name}" repository`;
  const existingTask = await getTaskByName(taskName);
  const task = existingTask
    ? existingTask
    : await createTask({
        text: taskName,
        type: TaskType.HABIT,
        value: isFeature ? 5 : 3,
        priority: isFeature ? TaskPriority.HIGH : TaskPriority.NORMAL,
      });

  return await scoreTask(task.id, TaskDirection.UP);
};

export default pullRequestHandler;
