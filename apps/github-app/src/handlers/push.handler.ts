import { PushEvent } from '@octokit/webhooks-types';
import {
  TaskDirection,
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
  const taskName = `Pushed commits in ${repository.name}`;
  const tasks = await getTasks();
  const existingTask = tasks.find(task => task.text === taskName);
  const task = existingTask
    ? existingTask
    : await createTask({
        text: taskName,
        type: TaskType.HABIT,
        value: 1,
      });

  commits.forEach(() => {
    scoreTask(task.id, TaskDirection.UP);
  });
};

export default pushHandler;
