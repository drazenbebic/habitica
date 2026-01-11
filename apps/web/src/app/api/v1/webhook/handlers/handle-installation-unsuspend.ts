import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationUnsuspend = async ({
  payload: { installation },
}: EmitterWebhookEvent<'installation.unsuspend'>) => {
  logger.info('Event triggered.');

  const updatedGitHubInstallation = await prisma.githubInstallations.update({
    data: { suspended: false },
    where: { installationId: installation.id },
  });

  if (!updatedGitHubInstallation) {
    throw new Error(
      '[installation.suspend]: The installation could not be unsuspended.',
    );
  }

  logger.info('Event processed.');
};
