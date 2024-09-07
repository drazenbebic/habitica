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
} from 'npm:@octokit/webhooks-types@7.5.1';
import placeholder from './placeholder.ts';
import { SupabaseClient } from 'npm:@supabase/supabase-js@1.13.1';

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
        return await placeholder({ action, event: 'installation' });
      case 'unsuspend':
        return await placeholder({ action, event: 'installation' });
      case 'deleted':
        return await placeholder({ action, event: 'installation' });
      case 'created':
        return await placeholder({ action, event: 'installation' });
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
    return await placeholder({ action, event: 'pull_request_review' });
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
