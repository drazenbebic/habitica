import { EmitterWebhookEvent } from '@octokit/webhooks/types';
import { v4 } from 'uuid';

import { getRequestContext } from '@/lib/context';
import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleLogWebhook = async ({
  id,
  name,
  payload,
}: EmitterWebhookEvent) => {
  logger.info('Logging webhook.');

  const ctx = getRequestContext();

  if (!ctx) {
    logger.error('Webhook context lost. Cannot log event.');
    return;
  }

  if (!payload.sender?.id) {
    logger.error('Sender could not be identified. Cannot log event.');
  }

  const githubUser = await prisma.githubUsers.findFirst({
    where: { githubId: payload.sender?.id },
  });

  if (!githubUser) {
    return;
  }

  const { signature, hookId } = ctx;

  await prisma.webhookLogs.create({
    data: {
      uuid: v4(),
      deliveryUuid: id,
      event: name,
      signature,
      hookId,
      githubUserId: githubUser.id,
      // @ts-expect-error Just a type mismatch
      payload,
    },
  });

  logger.info('Event logged.');
};
