import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationRepositoriesRemoved = async ({
  payload: { installation, repositories_removed: repositoriesRemoved },
}: EmitterWebhookEvent<'installation_repositories.removed'>) => {
  if (!repositoriesRemoved || repositoriesRemoved.length === 0) {
    return;
  }

  const existingInstallation = await prisma.githubInstallations.findUnique({
    where: { installationId: installation.id },
  });

  if (!existingInstallation) {
    logger.warn({ installationId: installation.id }, 'Installation not found.');
    return;
  }

  await prisma.githubSelectedRepositories.deleteMany({
    where: {
      installationId: existingInstallation.id,
      githubRepositoryId: {
        in: repositoriesRemoved.map(({ id }) => id),
      },
    },
  });

  logger.info({ count: repositoriesRemoved.length }, 'Repositories removed.');
};
