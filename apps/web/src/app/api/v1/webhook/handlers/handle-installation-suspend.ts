import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationSuspend = async ({
  payload: { installation },
}: EmitterWebhookEvent<'installation.suspend'>) => {
  logger.info('Event triggered.');

  const updatedGitHubInstallation = await prisma.githubInstallations.update({
    data: { suspended: true },
    where: { installationId: installation.id },
  });

  if (!updatedGitHubInstallation) {
    throw new Error(
      '[installation.suspend]: The installation could not be suspended.',
    );
  }
};
