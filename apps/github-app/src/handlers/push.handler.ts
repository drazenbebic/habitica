import { PushEvent } from '@octokit/webhooks-types';
import {
  Task,
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
  let task: Task;
  const taskName = `Pushed commits in ${repository.name}`;
  const {
    data: { data: tasks },
  } = await getTasks();

  const existingTask = tasks.find(task => task.text === taskName);

  if (!existingTask) {
    const {
      data: { data },
    } = await createTask({
      text: taskName,
      type: TaskType.HABIT,
      value: 1,
    });

    task = data;
  } else {
    task = existingTask;
  }

  commits.forEach(() => {
    scoreTask(task.id, TaskDirection.UP);
  });
};

export default pushHandler;
