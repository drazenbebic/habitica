import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationRepositoriesAdded = async ({
  payload: { installation, repositories_added: repositoriesAdded },
}: EmitterWebhookEvent<'installation_repositories.added'>) => {
  logger.info({ installationId: installation.id }, 'Event triggered.');

  if (!repositoriesAdded || repositoriesAdded.length === 0) {
    return;
  }

  const existingInstallation = await prisma.githubInstallations.findUnique({
    where: { installationId: installation.id },
  });

  if (!existingInstallation) {
    logger.warn({ installationId: installation.id }, 'Installation not found.');
    return;
  }

  await prisma.githubSelectedRepositories.createMany({
    data: repositoriesAdded.map(repository => ({
      installationId: existingInstallation.id,
      githubRepositoryId: repository.id,
      nodeId: repository.node_id,
      name: repository.name,
      fullName: repository.full_name,
      private: repository.private,
    })),
    skipDuplicates: true,
  });

  logger.info({ count: repositoriesAdded.length }, 'Repositories added.');
};
