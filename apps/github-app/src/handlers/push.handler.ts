import { PushEvent } from '@octokit/webhooks-types';
import {
  TaskDirection,
  TaskPriority,
  TaskType,
  createTask,
  getTasks,
  scoreTask,
} from '@habitica/api';

const pushHandler = async (
  deliveryUuid: string,
  hookId: string,
  { commits, repository }: PushEvent,
) => {
  const taskName = `Push commits to the "${repository.name}" repository`;
  const tasks = await getTasks();
  const existingTask = tasks.find(task => task.text === taskName);
  const task = existingTask
    ? existingTask
    : await createTask({
        text: taskName,
        type: TaskType.HABIT,
        value: 1,
        priority: TaskPriority.LOW,
      });

  return Promise.all(
    commits.map(async () => {
      await scoreTask(task.id, TaskDirection.UP);
    }),
  );
};

export default pushHandler;
