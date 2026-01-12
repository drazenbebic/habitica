import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationDeleted = async ({
  payload: { installation },
}: EmitterWebhookEvent<'installation.deleted'>) => {
  logger.info('Event triggered.');

  try {
    await prisma.githubInstallations.delete({
      where: {
        installationId: Number(installation.id),
      },
    });

    logger.info('Installation and all related data deleted successfully.');
  } catch (error) {
    logger.error({ error }, 'Failed to delete installation.');
  }

  logger.info('Event processed.');
};
