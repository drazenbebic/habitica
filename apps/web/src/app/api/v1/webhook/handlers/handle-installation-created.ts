import { EmitterWebhookEvent } from '@octokit/webhooks/types';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationCreated = async ({
  payload: { installation, sender },
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
  });

  logger.info('Event processed.');
};
