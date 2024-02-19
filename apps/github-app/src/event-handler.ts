import {
  HabiticaApi,
  TaskDirection,
  TaskPriority,
  TaskType,
} from '@habitica/api';
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
import { getTaskByName, prisma } from './utils';

class EventHandler {
  api: HabiticaApi;

  constructor(habiticaApi: HabiticaApi) {
    this.api = habiticaApi;
  }

  installation = async ({ action, installation }: InstallationEvent) => {
    switch (action) {
      case 'suspend':
      case 'unsuspend':
        await prisma.gitHubInstallations.updateMany({
          data: {
            suspended: action === 'suspend',
          },
          where: {
            installationId: installation.id,
          },
        });
        break;
      case 'deleted':
        await prisma.gitHubInstallations.deleteMany({
          where: {
            installationId: installation.id,
          },
        });
        break;
      case 'created':
        console.log('⭐ New installation created! ⭐️');
        break;
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
    pull_request: pullRequest,
    repository,
  }: PullRequestEvent) => {
    if (action !== 'closed') {
      return;
    }

    const isFeature = pullRequest.title.startsWith('feat');
    const isBugFix = pullRequest.title.startsWith('fix');

    if (!isFeature && !isBugFix) {
      return;
    }

    const taskName = `Merged a ${isFeature ? 'feature' : 'bug fix'} branch in the "${repository.name}" repository`;
    const existingTask = await getTaskByName(this.api, taskName);
    const task = existingTask
      ? existingTask
      : await this.api.createTask({
          text: taskName,
          type: TaskType.HABIT,
          value: isFeature ? 5 : 3,
          priority: isFeature ? TaskPriority.HIGH : TaskPriority.NORMAL,
        });

    return await this.api.scoreTask(task.id, TaskDirection.UP);
  };

  pullRequestReview = async ({
    action,
    repository,
  }: PullRequestReviewEvent) => {
    if (action !== 'submitted') {
      return;
    }

    const taskName = `Review pull requests in the "${repository.name}" repository`;
    const tasks = await this.api.getTasks();
    const existingTask = tasks.find(task => task.text === taskName);
    const task = existingTask
      ? existingTask
      : await this.api.createTask({
          text: taskName,
          type: TaskType.HABIT,
          value: 3,
          priority: TaskPriority.HIGH,
        });

    return await this.api.scoreTask(task.id, TaskDirection.UP);
  };

  push = async ({ commits, repository }: PushEvent) => {
    const taskName = `Push commits to the "${repository.name}" repository`;
    const tasks = await this.api.getTasks();
    const existingTask = tasks.find(task => task.text === taskName);
    const task = existingTask
      ? existingTask
      : await this.api.createTask({
          text: taskName,
          type: TaskType.HABIT,
          value: 1,
          priority: TaskPriority.LOW,
        });

    return Promise.all(
      commits.map(async () => {
        await this.api.scoreTask(task.id, TaskDirection.UP);
      }),
    );
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
