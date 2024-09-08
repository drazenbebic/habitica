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
} from 'npm:@octokit/webhooks-types@7';
import placeholderHandler from './placeholder-handler.ts';
import { SupabaseClient } from 'npm:@supabase/supabase-js@2';
import {
  installationCreateHandler,
  installationDeleteHandler,
  installationToggleHandler,
  pullRequestHandler,
  pushCommitsHandler,
} from './handlers/index.ts';

class EventHandler {
  protected supabase;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  installation = async (event: InstallationEvent) => {
    switch (event.action) {
      case 'suspend':
        return await installationToggleHandler(event, true, this.supabase);
      case 'unsuspend':
        return await installationToggleHandler(event, false, this.supabase);
      case 'deleted':
        return await installationDeleteHandler(event, this.supabase);
      case 'created':
        return await installationCreateHandler(event, this.supabase);
      default:
        return placeholderHandler({
          action: event.action,
          event: 'installation',
        });
    }
  };

  issueComment = async ({ action }: IssueCommentEvent) => {
    return await placeholderHandler({ action, event: 'issue_comment' });
  };

  issues = async ({ action }: IssuesEvent) => {
    return await placeholderHandler({ action, event: 'issues' });
  };

  // TODO: Split like installation.
  pullRequest = async (event: PullRequestEvent) => {
    return await pullRequestHandler(event, this.supabase);
  };

  pullRequestReview = async ({
    action,
    installation,
    repository,
    sender,
  }: PullRequestReviewEvent) => {
    return await placeholderHandler({ action, event: 'pull_request_review' });
  };

  push = async (event: PushEvent) => {
    return await pushCommitsHandler(event, this.supabase);
  };

  registryPackage = async ({ action }: RegistryPackagePublishedEvent) => {
    return await placeholderHandler({ action, event: 'registry_package' });
  };

  workflowJob = async ({ action }: WorkflowJobEvent) => {
    return await placeholderHandler({ action, event: 'workflow_job' });
  };

  workflowRun = async ({ action }: WorkflowRunEvent) => {
    return await placeholderHandler({ action, event: 'workflow_run' });
  };
}

export default EventHandler;
