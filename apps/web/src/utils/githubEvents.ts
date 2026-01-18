import { ComboboxItemType } from '@/components/ui/Combobox';

export const getGroupedGithubEvents = (): ComboboxItemType[] => [
  // Create
  {
    value: 'create',
    label: 'Create',
    group: 'Create',
  },
  // Delete
  {
    value: 'delete',
    label: 'Delete',
    group: 'Delete',
  },
  // Discussion
  {
    value: 'discussion.answered',
    label: 'Discussion Answered',
    group: 'Discussion',
  },
  {
    value: 'discussion.category_changed',
    label: 'Discussion Category Changed',
    group: 'Discussion',
  },
  {
    value: 'discussion.closed',
    label: 'Discussion Closed',
    group: 'Discussion',
  },
  {
    value: 'discussion.created',
    label: 'Discussion Created',
    group: 'Discussion',
  },
  {
    value: 'discussion.deleted',
    label: 'Discussion Deleted',
    group: 'Discussion',
  },
  {
    value: 'discussion.edited',
    label: 'Discussion Edited',
    group: 'Discussion',
  },
  {
    value: 'discussion.labeled',
    label: 'Discussion Labeled',
    group: 'Discussion',
  },
  {
    value: 'discussion.locked',
    label: 'Discussion Locked',
    group: 'Discussion',
  },
  {
    value: 'discussion.pinned',
    label: 'Discussion Pinned',
    group: 'Discussion',
  },
  {
    value: 'discussion.reopened',
    label: 'Discussion Reopened',
    group: 'Discussion',
  },
  {
    value: 'discussion.transferred',
    label: 'Discussion Transferred',
    group: 'Discussion',
  },
  {
    value: 'discussion.unlabeled',
    label: 'Discussion Unlabeled',
    group: 'Discussion',
  },
  {
    value: 'discussion.unlocked',
    label: 'Discussion Unlocked',
    group: 'Discussion',
  },
  {
    value: 'discussion.unpinned',
    label: 'Discussion Unpinned',
    group: 'Discussion',
  },
  // Discussion Comment
  {
    value: 'discussion_comment.created',
    label: 'Discussion Comment Created',
    group: 'Discussion Comment',
  },
  {
    value: 'discussion_comment.deleted',
    label: 'Discussion Comment Deleted',
    group: 'Discussion Comment',
  },
  {
    value: 'discussion_comment.edited',
    label: 'Discussion Comment Edited',
    group: 'Discussion Comment',
  },
  // Fork
  {
    value: 'fork',
    label: 'Fork',
    group: 'Fork',
  },
  // Gollum
  {
    value: 'gollum',
    label: 'Gollum',
    group: 'Gollum',
  },
  // Issue Comment
  {
    value: 'issue_comment.created',
    label: 'Issue Comment Created',
    group: 'Issue Comment',
  },
  {
    value: 'issue_comment.deleted',
    label: 'Issue Comment Deleted',
    group: 'Issue Comment',
  },
  {
    value: 'issue_comment.edited',
    label: 'Issue Comment Edited',
    group: 'Issue Comment',
  },
  // Issues
  {
    value: 'issues.assigned',
    label: 'Issues Assigned',
    group: 'Issues',
  },
  {
    value: 'issues.closed',
    label: 'Issues Closed',
    group: 'Issues',
  },
  {
    value: 'issues.deleted',
    label: 'Issues Deleted',
    group: 'Issues',
  },
  {
    value: 'issues.demilestoned',
    label: 'Issues Demilestoned',
    group: 'Issues',
  },
  {
    value: 'issues.edited',
    label: 'Issues Edited',
    group: 'Issues',
  },
  {
    value: 'issues.labeled',
    label: 'Issues Labeled',
    group: 'Issues',
  },
  {
    value: 'issues.locked',
    label: 'Issues Locked',
    group: 'Issues',
  },
  {
    value: 'issues.milestoned',
    label: 'Issues Milestoned',
    group: 'Issues',
  },
  {
    value: 'issues.opened',
    label: 'Issues Opened',
    group: 'Issues',
  },
  {
    value: 'issues.pinned',
    label: 'Issues Pinned',
    group: 'Issues',
  },
  {
    value: 'issues.reopened',
    label: 'Issues Reopened',
    group: 'Issues',
  },
  {
    value: 'issues.transferred',
    label: 'Issues Transferred',
    group: 'Issues',
  },
  {
    value: 'issues.typed',
    label: 'Issues Typed',
    group: 'Issues',
  },
  {
    value: 'issues.unassigned',
    label: 'Issues Unassigned',
    group: 'Issues',
  },
  {
    value: 'issues.unlabeled',
    label: 'Issues Unlabeled',
    group: 'Issues',
  },
  {
    value: 'issues.unlocked',
    label: 'Issues Unlocked',
    group: 'Issues',
  },
  {
    value: 'issues.unpinned',
    label: 'Issues Unpinned',
    group: 'Issues',
  },
  {
    value: 'issues.untyped',
    label: 'Issues Untyped',
    group: 'Issues',
  },
  // Label
  {
    value: 'label.created',
    label: 'Label Created',
    group: 'Label',
  },
  {
    value: 'label.deleted',
    label: 'Label Deleted',
    group: 'Label',
  },
  {
    value: 'label.edited',
    label: 'Label Edited',
    group: 'Label',
  },
  // Milestone
  {
    value: 'milestone.closed',
    label: 'Milestone Closed',
    group: 'Milestone',
  },
  {
    value: 'milestone.created',
    label: 'Milestone Created',
    group: 'Milestone',
  },
  {
    value: 'milestone.deleted',
    label: 'Milestone Deleted',
    group: 'Milestone',
  },
  {
    value: 'milestone.edited',
    label: 'Milestone Edited',
    group: 'Milestone',
  },
  {
    value: 'milestone.opened',
    label: 'Milestone Opened',
    group: 'Milestone',
  },
  // Package
  {
    value: 'package.published',
    label: 'Package Published',
    group: 'Package',
  },
  {
    value: 'package.updated',
    label: 'Package Updated',
    group: 'Package',
  },
  // Pull Request
  {
    value: 'pull_request.assigned',
    label: 'Pull Request Assigned',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.closed',
    label: 'Pull Request Closed',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.converted_to_draft',
    label: 'Pull Request Converted to Draft',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.dequeued',
    label: 'Pull Request Dequeued',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.edited',
    label: 'Pull Request Edited',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.enqueued',
    label: 'Pull Request Enqueued',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.labeled',
    label: 'Pull Request Labeled',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.locked',
    label: 'Pull Request Locked',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.opened',
    label: 'Pull Request Opened',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.ready_for_review',
    label: 'Pull Request Ready for Review',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.reopened',
    label: 'Pull Request Reopened',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.review_request_removed',
    label: 'Pull Request Review Request Removed',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.review_requested',
    label: 'Pull Request Review Requested',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.synchronize',
    label: 'Pull Request Synchronize',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.unassigned',
    label: 'Pull Request Unassigned',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.unlabeled',
    label: 'Pull Request Unlabeled',
    group: 'Pull Request',
  },
  {
    value: 'pull_request.unlocked',
    label: 'Pull Request Unlocked',
    group: 'Pull Request',
  },
  // Pull Request Review
  {
    value: 'pull_request_review.dismissed',
    label: 'Pull Request Review Dismissed',
    group: 'Pull Request Review',
  },
  {
    value: 'pull_request_review.edited',
    label: 'Pull Request Review Edited',
    group: 'Pull Request Review',
  },
  {
    value: 'pull_request_review.submitted',
    label: 'Pull Request Review Submitted',
    group: 'Pull Request Review',
  },
  // Pull Request Review Comment
  {
    value: 'pull_request_review_comment.created',
    label: 'Pull Request Review Comment Created',
    group: 'Pull Request Review Comment',
  },
  {
    value: 'pull_request_review_comment.deleted',
    label: 'Pull Request Review Comment Deleted',
    group: 'Pull Request Review Comment',
  },
  {
    value: 'pull_request_review_comment.edited',
    label: 'Pull Request Review Comment Edited',
    group: 'Pull Request Review Comment',
  },
  // Pull Request Review Thread
  {
    value: 'pull_request_review_thread.resolved',
    label: 'Pull Request Review Thread Resolved',
    group: 'Pull Request Review Thread',
  },
  {
    value: 'pull_request_review_thread.unresolved',
    label: 'Pull Request Review Thread Unresolved',
    group: 'Pull Request Review Thread',
  },
  // Push
  {
    value: 'push',
    label: 'Push to Repository',
    group: 'Push',
  },
  // Release
  {
    value: 'release.created',
    label: 'Release Created',
    group: 'Release',
  },
  {
    value: 'release.deleted',
    label: 'Release Deleted',
    group: 'Release',
  },
  {
    value: 'release.edited',
    label: 'Release Edited',
    group: 'Release',
  },
  {
    value: 'release.prereleased',
    label: 'Release Prereleased',
    group: 'Release',
  },
  {
    value: 'release.published',
    label: 'Release Published',
    group: 'Release',
  },
  {
    value: 'release.released',
    label: 'Release Released',
    group: 'Release',
  },
  {
    value: 'release.unpublished',
    label: 'Release Unpublished',
    group: 'Release',
  },
  // Repository
  {
    value: 'repository.archived',
    label: 'Repository Archived',
    group: 'Repository',
  },
  {
    value: 'repository.created',
    label: 'Repository Created',
    group: 'Repository',
  },
  {
    value: 'repository.deleted',
    label: 'Repository Deleted',
    group: 'Repository',
  },
  {
    value: 'repository.edited',
    label: 'Repository Edited',
    group: 'Repository',
  },
  {
    value: 'repository.privatized',
    label: 'Repository Privatized',
    group: 'Repository',
  },
  {
    value: 'repository.publicized',
    label: 'Repository Publicized',
    group: 'Repository',
  },
  {
    value: 'repository.renamed',
    label: 'Repository Renamed',
    group: 'Repository',
  },
  {
    value: 'repository.transferred',
    label: 'Repository Transferred',
    group: 'Repository',
  },
  {
    value: 'repository.unarchived',
    label: 'Repository Unarchived',
    group: 'Repository',
  },
  // Star
  {
    value: 'star.created',
    label: 'Star Created',
    group: 'Star',
  },
  {
    value: 'star.deleted',
    label: 'Star Deleted',
    group: 'Star',
  },
  // Workflow Dispatch
  {
    value: 'workflow_dispatch',
    label: 'Workflow Dispatch',
    group: 'Workflow Dispatch',
  },
  // Workflow Job
  {
    value: 'workflow_job.completed',
    label: 'Workflow Job Completed',
    group: 'Workflow Job',
  },
  {
    value: 'workflow_job.in_progress',
    label: 'Workflow Job In Progress',
    group: 'Workflow Job',
  },
  {
    value: 'workflow_job.queued',
    label: 'Workflow Job Queued',
    group: 'Workflow Job',
  },
  {
    value: 'workflow_job.waiting',
    label: 'Workflow Job Waiting',
    group: 'Workflow Job',
  },
  // Workflow Run
  {
    value: 'workflow_run.completed',
    label: 'Workflow Run Completed',
    group: 'Workflow Run',
  },
  {
    value: 'workflow_run.in_progress',
    label: 'Workflow Run In Progress',
    group: 'Workflow Run',
  },
  {
    value: 'workflow_run.requested',
    label: 'Workflow Run Requested',
    group: 'Workflow Run',
  },
];
