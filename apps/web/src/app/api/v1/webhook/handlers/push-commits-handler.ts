import { PushEvent } from '@octokit/webhooks-types';

import { TaskDirection, TaskPriority, TaskType } from '../enums';
import getHabiticaApi from '../get-habitica-api';

export const pushHandler = async ({
  commits,
  repository,
  installation,
}: PushEvent) => {
  console.info('[push]: Event triggered.');

  if (!installation?.id) {
    console.info('[push]: Installation is missing.');
    return;
  }

  const validCommits = commits.filter(
    ({ author }) => author.username !== 'dependabot[bot]',
  );

  if (validCommits.length <= 0) {
    console.info('[push]: All commits skipped.', commits);
    return;
  }

  const taskName = `Push commits to the "${repository.name}" repository`;

  for (const commit of validCommits) {
    if (!commit.author?.username) {
      console.info('[push]: Author username missing. Commit skipped.');
      continue;
    }

    const habiticaApi = await getHabiticaApi(
      installation.id,
      commit.author.username,
    );

    if (!habiticaApi) {
      console.info('[push]: Habitica user missing. Commit skipped.');
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
