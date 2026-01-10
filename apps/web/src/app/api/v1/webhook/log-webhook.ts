import { WebhookEvent } from '@octokit/webhooks-types';
import { v4 } from 'uuid';

import { getGithubActorId } from '@/app/api/v1/webhook/get-github-actor-id';
import { WebhookHeaders } from '@/app/api/v1/webhook/types';
import prisma from '@/lib/prisma';

export const logWebhook = async (
  payload: WebhookEvent,
  headers: WebhookHeaders,
) => {
  const githubActorId = getGithubActorId(payload);

  if (!githubActorId) {
    return;
  }

  const githubUser = await prisma.githubUsers.findFirst({
    where: { githubId: githubActorId },
  });

  if (!githubUser) {
    return;
  }

  const { deliveryUuid, signature, event, hookId } = headers;

  await prisma.webhookLogs.create({
    data: {
      uuid: v4(),
      deliveryUuid,
      event,
      signature,
      hookId,
      githubUserId: githubUser.id,
      // @ts-expect-error Just a type mismatch
      payload,
    },
  });

  console.info(`[${event}]: Event logged.`);
};
