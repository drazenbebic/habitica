import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationCreated = async ({
  payload: { installation, sender, repositories },
}: EmitterWebhookEvent<'installation.created'>) => {
  logger.info({ installationId: installation.id }, 'Event triggered.');

  const existingGithubInstallation =
    await prisma.githubInstallations.findUnique({
      where: { installationId: Number(installation.id) },
    });

  if (existingGithubInstallation) {
    logger.info('Installation already exists, skipping.');
    return;
  }

  try {
    await prisma.$transaction(async tx => {
      const githubInstallation = await tx.githubInstallations.create({
        data: {
          installationId: installation.id,
        },
      });

      await tx.githubUsers.create({
        data: {
          installationId: githubInstallation.id,
          login: sender.login,
          githubId: sender.id,
          nodeId: sender.node_id,
          avatarUrl: sender.avatar_url,
          gravatarId: sender.gravatar_id,
          htmlUrl: sender.html_url,
          type: sender.type,
          name: sender.name,
          email: sender.email,
        },
      });

      if (repositories && repositories.length > 0) {
        await tx.githubSelectedRepositories.createMany({
          data: repositories.map(repository => ({
            installationId: githubInstallation.id,
            githubRepositoryId: repository.id,
            nodeId: repository.node_id,
            name: repository.name,
            fullName: repository.full_name,
            private: repository.private,
          })),
          skipDuplicates: true,
        });

        logger.info(
          { count: repositories.length },
          'Initial repositories added.',
        );
      }
    });
  } catch (error) {
    console.error('TX FAILED:', error);
  }

  logger.info({ installationId: installation.id }, 'Installation created.');
};
