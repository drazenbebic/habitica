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
import placeholder from './placeholder.ts';
import { SupabaseClient } from 'npm:@supabase/supabase-js@2';
import {
  createInstallation,
  deleteInstallation,
  toggleInstallation,
} from './handlers/installation.ts';
import { pushCommits } from './handlers/push-commits.ts';

class EventHandler {
  protected supabase;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  installation = async ({
    action,
    installation,
    sender,
  }: InstallationEvent) => {
    const installationId = installation.id;

    switch (action) {
      case 'suspend':
        return await toggleInstallation(
          { action, installationId, suspended: true },
          this.supabase,
        );
      case 'unsuspend':
        return await toggleInstallation(
          { action, installationId, suspended: false },
          this.supabase,
        );
      case 'deleted':
        return await deleteInstallation({ installationId }, this.supabase);
      case 'created':
        return await createInstallation(
          { installationId, sender },
          this.supabase,
        );
    }
  };

  issueComment = async ({ action }: IssueCommentEvent) => {
    return await placeholder({ action, event: 'issue_comment' });
  };

  issues = async ({ action }: IssuesEvent) => {
    return await placeholder({ action, event: 'issues' });
  };

  pullRequest = async ({
    action,
    installation,
    pull_request: pullRequest,
    repository,
    sender,
  }: PullRequestEvent) => {
    return await placeholder({ action, event: 'pull_request' });
  };

  pullRequestReview = async ({
    action,
    installation,
    repository,
    sender,
  }: PullRequestReviewEvent) => {
    return await placeholder({ action, event: 'pull_request_review' });
  };

  push = async ({ action, commits, installation, repository }: PushEvent) => {
    return await pushCommits(
      { action, commits, installation, repository },
      this.supabase,
    );
  };

  registryPackage = async ({ action }: RegistryPackagePublishedEvent) => {
    return await placeholder({ action, event: 'registry_package' });
  };

  workflowJob = async ({ action }: WorkflowJobEvent) => {
    return await placeholder({ action, event: 'workflow_job' });
  };

  workflowRun = async ({ action }: WorkflowRunEvent) => {
    return await placeholder({ action, event: 'workflow_run' });
  };
}

export default EventHandler;
