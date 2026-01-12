import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationSuspend = async ({
  payload: { installation },
}: EmitterWebhookEvent<'installation.suspend'>) => {
  logger.info('Event triggered.');

  try {
    await prisma.githubInstallations.update({
      data: { suspended: true },
      where: { installationId: installation.id },
    });
  } catch (error) {
    logger.error({ error }, 'The installation could not be suspended.');
  }

  logger.info('Event processed.');
};
