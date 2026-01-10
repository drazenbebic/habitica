import { InstallationEvent } from '@octokit/webhooks-types';
import { v4 } from 'uuid';

import prisma from '@/lib/prisma';

import HttpError from '../http-error';

export const installationToggleHandler = async (
  { action, installation }: InstallationEvent,
  suspended: boolean,
) => {
  console.info(`[INSTALLATION:${action.toUpperCase()}]: Event triggered.`);

  const updatedGitHubInstallation = await prisma.githubInstallations.update({
    data: { suspended },
    where: { installationId: installation.id },
  });

  if (!updatedGitHubInstallation) {
    console.error('The GitHub Installation could not be toggled.', {
      installation,
      suspended,
    });
  }
};

export const installationDeleteHandler = async ({
  installation,
}: InstallationEvent) => {
  console.info('[installation.deleted]: Event triggered.');

  const gitHubInstallation = await prisma.githubInstallations.findFirst({
    where: {
      installationId: Number(installation.id),
    },
  });

  if (!gitHubInstallation) {
    throw new HttpError('The installation could not be found.', 404);
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
};

export const installationCreateHandler = async ({
  installation,
  sender,
}: InstallationEvent) => {
  console.info('[installation.created]: Event triggered.');

  const existingGitHubInstallation = await prisma.githubInstallations.findFirst(
    {
      where: { installationId: Number(installation.id) },
    },
  );

  if (existingGitHubInstallation) {
    throw new HttpError('An installation with this ID already exists.', 409);
  }

  const gitHubInstallation = await prisma.githubInstallations.create({
    data: {
      uuid: v4(),
      installationId: installation.id,
    },
  });

  if (!gitHubInstallation) {
    throw new HttpError('The installation could not be created.', 500);
  }

  // Add the GitHub user.
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
    throw new HttpError('The GitHub User could not be created.', 500);
  }
};
