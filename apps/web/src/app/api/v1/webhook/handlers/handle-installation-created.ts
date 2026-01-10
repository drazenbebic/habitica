import { EmitterWebhookEvent } from '@octokit/webhooks/types';
import { v4 } from 'uuid';

import logger from '@/lib/logger';
import prisma from '@/lib/prisma';

export const handleInstallationCreated = async ({
  payload: { installation, sender },
}: EmitterWebhookEvent<'installation.created'>) => {
  logger.info({ installationId: installation.id }, 'Event triggered.');

  const existingGitHubInstallation = await prisma.githubInstallations.findFirst(
    {
      where: { installationId: Number(installation.id) },
    },
  );

  if (existingGitHubInstallation) {
    logger.warn('Installation already exists, skipping.');
    return;
  }

  const gitHubInstallation = await prisma.githubInstallations.create({
    data: {
      uuid: v4(),
      installationId: installation.id,
    },
  });

  if (!gitHubInstallation) {
    throw new Error(
      '[installation.created]: Prisma failed to create installation record.',
    );
  }

  const gitHubUser = await prisma.githubUsers.create({
    data: {
      uuid: v4(),
      installationId: gitHubInstallation.id,
      login: sender?.login,
      githubId: sender?.id,
      nodeId: sender?.node_id,
      avatarUrl: sender?.avatar_url,
      gravatarId: sender?.gravatar_id,
      htmlUrl: sender?.html_url,
      type: sender?.type,
      name: sender?.name,
      email: sender?.email,
    },
  });

  if (!gitHubUser) {
    throw new Error(
      '[installation.created]: The GitHub User could not be created.',
    );
  }
};
