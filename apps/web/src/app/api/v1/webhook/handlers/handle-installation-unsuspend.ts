import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationUnsuspend = async ({
  payload: { installation },
}: EmitterWebhookEvent<'installation.unsuspend'>) => {
  logger.info('Event triggered.');

  try {
    await prisma.githubInstallations.update({
      data: { suspended: false },
      where: { installationId: installation.id },
    });
  } catch (error) {
    logger.error({ error }, 'The installation could not be unsuspended.');
  }

  logger.info('Event processed.');
};
