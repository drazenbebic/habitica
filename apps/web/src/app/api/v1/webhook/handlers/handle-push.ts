import { EmitterWebhookEvent } from '@octokit/webhooks';

import { getInstallationStatus } from '@/accessors/githubInstallation';
import { getLinkedGithubUsers } from '@/accessors/githubUser';
import getHabiticaApi from '@/app/api/v1/webhook/get-habitica-api';
import { TaskDirection, TaskPriority, TaskType } from '@/enums/habitica';
import logger from '@/lib/logger';

export const handlePush = async ({
  payload: { commits, repository, installation },
}: EmitterWebhookEvent<'push'>) => {
  if (!installation?.id || !repository) {
    logger.info('Ignored: Missing installation or repository.');
    return;
  }

  const githubInstallation = await getInstallationStatus(
    installation.id,
    repository.id,
  );

  if (!githubInstallation) {
    logger.info('Ignored: Installation not found.');
    return;
  }

  if (githubInstallation.isSuspended) {
    logger.info('Ignored: Installation is suspended.');
    return;
  }

  if (!githubInstallation.isRepositorySelected) {
    logger.info(
      { repoId: repository.id },
      'Ignored: Repository not whitelisted.',
    );
    return;
  }

  const validCommits = commits.filter(
    commit =>
      commit.author.username && !commit.author.username.includes('[bot]'),
  );

  if (validCommits.length === 0) {
    logger.info('Ignored: No valid commits found.');
    return;
  }

  // Extract unique usernames to minimize DB queries
  const authorUsernames = [
    ...new Set(validCommits.map(c => c.author.username!)),
  ];

  const githubUsers = await getLinkedGithubUsers(authorUsernames);

  if (githubUsers.length === 0) {
    return;
  }

  await Promise.all(
    githubUsers.map(async user => {
      // Count how many commits this specific user owns in this push
      const userCommitCount = validCommits.filter(
        commit => commit.author.username === user.login,
      ).length;

      const habiticaApi = await getHabiticaApi(installation.id, user.login);

      if (!habiticaApi) {
        logger.error('Habitica API initialization failed.');
        return;
      }

      const taskName = `Pushed a commit to the "${repository.name}" repository`;

      try {
        const tasks = await habiticaApi.getTasks();

        const task =
          tasks.find(t => t.text === taskName) ||
          (await habiticaApi.createTask({
            text: taskName,
            type: TaskType.HABIT,
            value: 1,
            priority: TaskPriority.LOW,
          }));

        // Score the task X times (sequentially to ensure reliability)
        for (let i = 0; i < userCommitCount; i++) {
          await habiticaApi.scoreTask(task.id, TaskDirection.UP);
        }

        logger.info('Event processed successfully.');
      } catch (error) {
        logger.error({ error }, 'Habitica API Error');
      }
    }),
  );
};
