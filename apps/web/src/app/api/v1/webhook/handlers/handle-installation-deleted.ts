import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationDeleted = async ({
  payload: { installation },
}: EmitterWebhookEvent<'installation.deleted'>) => {
  logger.info('Event triggered.');

  const gitHubInstallation = await prisma.githubInstallations.findFirst({
    where: {
      installationId: Number(installation.id),
    },
  });

  if (!gitHubInstallation) {
    throw new Error(
      '[installation.deleted]: The installation could not be found.',
    );
  }

  const gitHubUsers = await prisma.githubUsers.findMany({
    where: { installationId: gitHubInstallation.id },
  });

  if (gitHubUsers.length > 0) {
    await prisma.habiticaUsers.deleteMany({
      where: {
        githubUserId: {
          in: gitHubUsers.map(({ id }) => id),
        },
      },
    });

    await prisma.githubUsers.deleteMany({
      where: {
        installationId: gitHubInstallation.id,
      },
    });
  }

  await prisma.githubInstallations.delete({
    where: { id: gitHubInstallation.id },
  });

  logger.info('Event processed.');
};
