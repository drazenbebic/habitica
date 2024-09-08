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
        return placeholderHandler({ action, event: 'installation' });
    }
  };

  meta = ({ action }: MetaEvent) => {
    return placeholderHandler({ action, event: 'meta' });
  };

  issueComment = ({ action }: IssueCommentEvent) => {
    return placeholderHandler({ action, event: 'issue_comment' });
  };

  issues = ({ action }: IssuesEvent) => {
    return placeholderHandler({ action, event: 'issues' });
  };

  pullRequest = async (event: PullRequestEvent) => {
    const { action } = event;

    switch (action) {
      case 'assigned':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'auto_merge_disabled':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'auto_merge_enabled':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'closed':
        return await pullRequestClosedHandler(event, this.supabase);
      case 'converted_to_draft':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'demilestoned':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'dequeued':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'edited':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'enqueued':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'labeled':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'locked':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'milestoned':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'opened':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'ready_for_review':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'reopened':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'review_request_removed':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'review_requested':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'synchronize':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'unassigned':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'unlabeled':
        return placeholderHandler({ action, event: 'pull_request' });
      case 'unlocked':
        return placeholderHandler({ action, event: 'pull_request' });
      default:
        return placeholderHandler({ action, event: 'pull_request' });
    }
  };

  pullRequestReview = async (event: PullRequestReviewEvent) => {
    const { action } = event;

    switch (event.action) {
      case 'dismissed':
        return placeholderHandler({
          action,
          event: 'pull_request_review',
        });
      case 'edited':
        return placeholderHandler({
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

  registryPackage = ({ action }: RegistryPackageEvent) => {
    return placeholderHandler({ action, event: 'registry_package' });
  };

  release = ({ action }: ReleaseEvent) => {
    return placeholderHandler({ action, event: 'release' });
  };

  repository = ({ action }: RepositoryEvent) => {
    return placeholderHandler({ action, event: 'repository' });
  };

  workflowDispatch = (_event: WorkflowDispatchEvent) => {
    return placeholderHandler({
      action: 'dispatch',
      event: 'workflow_dispatch',
    });
  };

  workflowJob = ({ action }: WorkflowJobEvent) => {
    return placeholderHandler({ action, event: 'workflow_job' });
  };

  workflowRun = ({ action }: WorkflowRunEvent) => {
    return placeholderHandler({ action, event: 'workflow_run' });
  };
}

export default EventHandler;
