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
  console.log('tasks:', tasks.length);
  const existingTask = tasks.find(task => task.text === taskName);
  console.log('existing:', existingTask);
  const task = existingTask
    ? existingTask
    : await createTask({
        text: taskName,
        type: TaskType.HABIT,
        value: 3,
        priority: TaskPriority.HIGH,
      });
  console.log('task:', task);

  return await scoreTask(task.id, TaskDirection.UP);
};

export default pullRequestReviewHandler;
