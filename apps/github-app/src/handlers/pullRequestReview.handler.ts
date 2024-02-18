import { PullRequestReviewEvent } from '@octokit/webhooks-types';
import {
  TaskDirection,
  TaskPriority,
  TaskType,
  createTask,
  getTasks,
  scoreTask,
} from '@habitica/api';

const pullRequestReviewHandler = async (
  deliveryUuid: string,
  hookId: string,
  { action, repository }: PullRequestReviewEvent,
) => {
  if (action !== 'submitted') {
    return;
  }

  const taskName = `Review pull requests in the "${repository.name}" repository`;
  const tasks = await getTasks();
  const existingTask = tasks.find(task => task.text === taskName);
  const task = existingTask
    ? existingTask
    : await createTask({
        text: taskName,
        type: TaskType.HABIT,
        value: 3,
        priority: TaskPriority.HIGH,
      });

  return await scoreTask(task.id, TaskDirection.UP);
};

export default pullRequestReviewHandler;
