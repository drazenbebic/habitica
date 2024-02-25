import { TaskDirection, TaskPriority, TaskType } from '@habitica/core';
import {
  InstallationEvent,
  IssueCommentEvent,
  IssuesEvent,
  PullRequestEvent,
  PullRequestReviewEvent,
  PushEvent,
  RegistryPackagePublishedEvent,
  WorkflowJobEvent,
  WorkflowRunEvent,
} from '@octokit/webhooks-types';
import {
  accountCreate,
  accountDelete,
  accountSuspend,
  accountUnsuspend,
  getHabiticaApi,
  getTaskByName,
} from './utils';

class EventHandler {
  installation = async ({
    action,
    installation,
    sender,
  }: InstallationEvent) => {
    const installationId = installation.id;

    switch (action) {
      case 'suspend':
        return await accountSuspend(installationId);
      case 'unsuspend':
        return await accountUnsuspend(installationId);
      case 'deleted':
        return await accountDelete(installationId);
      case 'created':
        return await accountCreate(installationId, sender);
    }
  };

  issueComment = async ({ action }: IssueCommentEvent) => {
    console.log(`🚧 TODO: issue_comment.${action} handler.`);
  };

  issues = async ({ action }: IssuesEvent) => {
    console.log(`🚧 TODO: issues.${action} handler.`);
  };

  pullRequest = async ({
    action,
    installation,
    pull_request: pullRequest,
    repository,
    sender,
  }: PullRequestEvent) => {
    const isFeature = pullRequest.title.startsWith('feat');
    const isBugFix = pullRequest.title.startsWith('fix');

    if (action !== 'closed' || (!isFeature && !isBugFix)) {
      return;
    }

    const habiticaApi = await getHabiticaApi(installation.id, sender.login);

    if (!habiticaApi) {
      return;
    }

    const taskName = `Merged a ${isFeature ? 'feature' : 'bug fix'} branch in the "${repository.name}" repository`;
    const existingTask = await getTaskByName(habiticaApi, taskName);
    const task = existingTask
      ? existingTask
      : await habiticaApi.createTask({
          text: taskName,
          type: TaskType.HABIT,
          value: isFeature ? 5 : 3,
          priority: isFeature ? TaskPriority.HIGH : TaskPriority.NORMAL,
        });

    await habiticaApi.scoreTask(task.id, TaskDirection.UP);
  };

  pullRequestReview = async ({
    action,
    installation,
    repository,
    sender,
  }: PullRequestReviewEvent) => {
    if (action !== 'submitted') {
      return;
    }

    const habiticaApi = await getHabiticaApi(installation.id, sender.login);

    if (!habiticaApi) {
      return;
    }

    const taskName = `Review pull requests in the "${repository.name}" repository`;
    const tasks = await habiticaApi.getTasks();
    const existingTask = tasks.find(({ text }) => text === taskName);
    const task = existingTask
      ? existingTask
      : await habiticaApi.createTask({
          text: taskName,
          type: TaskType.HABIT,
          value: 3,
          priority: TaskPriority.HIGH,
        });

    await habiticaApi.scoreTask(task.id, TaskDirection.UP);
  };

  push = async ({ commits, repository, installation }: PushEvent) => {
    const validCommits = commits.filter(
      ({ author }) => author.username !== 'dependabot[bot]',
    );

    if (validCommits.length <= 0) {
      return;
    }

    const taskName = `Push commits to the "${repository.name}" repository`;

    for (const commit of validCommits) {
      const habiticaApi = await getHabiticaApi(
        installation.id,
        commit.author.username,
      );

      if (!habiticaApi) {
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

  registryPackage = async ({ action }: RegistryPackagePublishedEvent) => {
    console.log(`🚧 TODO: registry_package.${action} handler.`);
  };

  workflowJob = async ({ action }: WorkflowJobEvent) => {
    console.log(`🚧 TODO: workflow_job.${action} handler.`);
  };

  workflowRun = async ({ action }: WorkflowRunEvent) => {
    console.log(`🚧 TODO: workflow_run.${action} handler.`);
  };
}

export default EventHandler;
