import {
  InstallationEvent,
  IssueCommentEvent,
  IssuesEvent,
  MetaEvent,
  PullRequestEvent,
  PullRequestReviewEvent,
  PushEvent,
  RegistryPackageEvent,
  ReleaseEvent,
  RepositoryEvent,
  WorkflowDispatchEvent,
  WorkflowJobEvent,
  WorkflowRunEvent,
} from '@octokit/webhooks-types';

import {
  installationCreateHandler,
  installationDeleteHandler,
  installationToggleHandler,
  pullRequestClosedHandler,
  pullRequestReviewSubmittedHandler,
  pushHandler,
} from './handlers';
import placeholderHandler from './placeholder-handler';

class EventHandler {
  installation = async (event: InstallationEvent) => {
    const { action } = event;

    switch (action) {
      case 'created':
        return await installationCreateHandler(event);
      case 'deleted':
        return await installationDeleteHandler(event);
      case 'suspend':
        return await installationToggleHandler(event, true);
      case 'unsuspend':
        return await installationToggleHandler(event, false);
      case 'new_permissions_accepted':
      default:
        return placeholderHandler({ action, event: 'installation' });
    }
  };

  meta = async ({ action }: MetaEvent) => {
    return placeholderHandler({ action, event: 'meta' });
  };

  issueComment = async (event: IssueCommentEvent) => {
    const { action } = event;

    switch (event.action) {
      case 'created':
      case 'deleted':
      case 'edited':
      default:
        return await placeholderHandler({ action, event: 'issue_comment' });
    }
  };

  issues = async ({ action }: IssuesEvent) => {
    return placeholderHandler({ action, event: 'issues' });
  };

  pullRequest = async (event: PullRequestEvent) => {
    const { action } = event;

    switch (action) {
      case 'closed':
        return await pullRequestClosedHandler(event);
      case 'assigned':
      case 'auto_merge_disabled':
      case 'auto_merge_enabled':
      case 'converted_to_draft':
      case 'demilestoned':
      case 'dequeued':
      case 'edited':
      case 'enqueued':
      case 'labeled':
      case 'locked':
      case 'milestoned':
      case 'opened':
      case 'ready_for_review':
      case 'reopened':
      case 'review_request_removed':
      case 'review_requested':
      case 'synchronize':
      case 'unassigned':
      case 'unlabeled':
      case 'unlocked':
      default:
        return placeholderHandler({ action, event: 'pull_request' });
    }
  };

  pullRequestReview = async (event: PullRequestReviewEvent) => {
    const { action } = event;

    switch (event.action) {
      case 'submitted':
        return await pullRequestReviewSubmittedHandler(event);
      case 'dismissed':
      case 'edited':
      default:
        return placeholderHandler({
          action,
          event: 'pull_request_review',
        });
    }
  };

  push = async (event: PushEvent) => {
    return await pushHandler(event);
  };

  registryPackage = async (event: RegistryPackageEvent) => {
    const { action } = event;

    switch (action) {
      case 'published':
      case 'updated':
      default:
        return placeholderHandler({ action, event: 'registry_package' });
    }
  };

  release = async (event: ReleaseEvent) => {
    const { action } = event;

    switch (action) {
      case 'created':
      case 'deleted':
      case 'edited':
      case 'prereleased':
      case 'published':
      case 'released':
      case 'unpublished':
      default:
        return placeholderHandler({ action, event: 'release' });
    }
  };

  repository = async (event: RepositoryEvent) => {
    const { action } = event;

    switch (action) {
      case 'archived':
      case 'created':
      case 'deleted':
      case 'edited':
      case 'privatized':
      case 'publicized':
      case 'renamed':
      case 'transferred':
      case 'unarchived':
      default:
        return placeholderHandler({ action, event: 'repository' });
    }
  };

  workflowDispatch = async (_event: WorkflowDispatchEvent) => {
    return placeholderHandler({
      action: 'dispatch',
      event: 'workflow_dispatch',
    });
  };

  workflowJob = async (event: WorkflowJobEvent) => {
    const { action } = event;

    switch (action) {
      case 'completed':
      case 'in_progress':
      case 'queued':
      case 'waiting':
      default:
        return placeholderHandler({ action, event: 'workflow_job' });
    }
  };

  workflowRun = async (event: WorkflowRunEvent) => {
    const { action } = event;

    switch (action) {
      case 'completed':
      case 'in_progress':
      case 'requested':
      default:
        return placeholderHandler({ action, event: 'workflow_run' });
    }
  };
}

export default EventHandler;
