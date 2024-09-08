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
} from 'npm:@octokit/webhooks-types@7';
import placeholderHandler from './placeholder-handler.ts';
import { SupabaseClient } from 'npm:@supabase/supabase-js@2';
import {
  installationCreateHandler,
  installationDeleteHandler,
  installationToggleHandler,
  pullRequestClosedHandler,
  pullRequestReviewSubmittedHandler,
  pushCommitsHandler,
} from './handlers/index.ts';

class EventHandler {
  protected supabase;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  installation = async (event: InstallationEvent) => {
    const { action } = event;

    switch (action) {
      case 'suspend':
        return await installationToggleHandler(event, true, this.supabase);
      case 'unsuspend':
        return await installationToggleHandler(event, false, this.supabase);
      case 'deleted':
        return await installationDeleteHandler(event, this.supabase);
      case 'created':
        return await installationCreateHandler(event, this.supabase);
      default:
        return await placeholderHandler({ action, event: 'installation' });
    }
  };

  meta = async ({ action }: MetaEvent) => {
    return await placeholderHandler({ action, event: 'meta' });
  };

  issueComment = async ({ action }: IssueCommentEvent) => {
    return await placeholderHandler({ action, event: 'issue_comment' });
  };

  issues = async ({ action }: IssuesEvent) => {
    return await placeholderHandler({ action, event: 'issues' });
  };

  pullRequest = async (event: PullRequestEvent) => {
    const { action } = event;

    switch (action) {
      case 'assigned':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'auto_merge_disabled':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'auto_merge_enabled':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'closed':
        return await pullRequestClosedHandler(event, this.supabase);
      case 'converted_to_draft':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'demilestoned':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'dequeued':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'edited':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'enqueued':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'labeled':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'locked':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'milestoned':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'opened':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'ready_for_review':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'reopened':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'review_request_removed':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'review_requested':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'synchronize':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'unassigned':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'unlabeled':
        return await placeholderHandler({ action, event: 'pull_request' });
      case 'unlocked':
        return await placeholderHandler({ action, event: 'pull_request' });
      default:
        return await placeholderHandler({ action, event: 'pull_request' });
    }
  };

  pullRequestReview = async (event: PullRequestReviewEvent) => {
    const { action } = event;

    switch (event.action) {
      case 'dismissed':
        return await placeholderHandler({
          action,
          event: 'pull_request_review',
        });
      case 'edited':
        return await placeholderHandler({
          action,
          event: 'pull_request_review',
        });
      case 'submitted':
        break;
      default:
        return await pullRequestReviewSubmittedHandler(event, this.supabase);
    }
  };

  push = async (event: PushEvent) => {
    return await pushCommitsHandler(event, this.supabase);
  };

  registryPackage = async ({ action }: RegistryPackageEvent) => {
    return await placeholderHandler({ action, event: 'registry_package' });
  };

  release = async ({ action }: ReleaseEvent) => {
    return await placeholderHandler({ action, event: 'release' });
  };

  repository = async ({ action }: RepositoryEvent) => {
    return await placeholderHandler({ action, event: 'repository' });
  };

  workflowDispatch = async (_event: WorkflowDispatchEvent) => {
    return await placeholderHandler({
      action: 'dispatch',
      event: 'workflow_dispatch',
    });
  };

  workflowJob = async ({ action }: WorkflowJobEvent) => {
    return await placeholderHandler({ action, event: 'workflow_job' });
  };

  workflowRun = async ({ action }: WorkflowRunEvent) => {
    return await placeholderHandler({ action, event: 'workflow_run' });
  };
}

export default EventHandler;
