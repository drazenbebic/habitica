import {
  HabiticaApi,
  TaskDirection,
  TaskPriority,
  TaskType,
} from '@habitica/api';
import {
  IssueCommentEvent,
  IssuesEvent,
  PullRequestEvent,
  PullRequestReviewEvent,
  PushEvent,
  RegistryPackagePublishedEvent,
} from '@octokit/webhooks-types';
import { getTaskByName } from './utils';

class EventHandler {
  api: HabiticaApi;

  constructor(habiticaApi: HabiticaApi) {
    this.api = habiticaApi;
  }

  issueComment = async (event: IssueCommentEvent) => {
    console.log('🚧 TODO: issue_comment handler.');
  };

  issues = async (event: IssuesEvent) => {
    console.log('🚧 TODO: issues handler.');
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

  registryPackage = async (event: RegistryPackagePublishedEvent) => {
    console.log('🚧 TODO: registry_package handler.');
  };
}

export default EventHandler;
