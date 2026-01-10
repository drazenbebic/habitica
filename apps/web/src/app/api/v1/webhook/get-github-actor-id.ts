import { WebhookEvent } from '@octokit/webhooks-types';

export function getGithubActorId(event: WebhookEvent): number | null {
  if ('sender' in event && event.sender) {
    return event.sender.id;
  }

  return null;
}
