import { HTTPError, prisma } from './index';
import { User } from '@octokit/webhooks-types';

export const accountSuspend = async (installationId: number) =>
  prisma.gitHubInstallations.update({
    data: {
      suspended: true,
    },
    where: {
      installationId,
    },
  });

export const accountUnsuspend = async (installationId: number) =>
  prisma.gitHubInstallations.update({
    data: {
      suspended: false,
    },
    where: {
      installationId,
    },
  });

export const accountDelete = async (installationId: number) => {
  const githubInstallation = await prisma.gitHubInstallations.findUnique({
    where: {
      installationId,
    },
  });

  if (!githubInstallation) {
    throw new HTTPError('The installation could not be found.', 404);
  }

  const gitHubUsers = await prisma.gitHubUsers.findMany({
    where: {
      installationUuid: githubInstallation.uuid,
    },
  });

  if (gitHubUsers.length > 0) {
    await prisma.habiticaUsers.deleteMany({
      where: {
        gitHubUserUuid: {
          in: gitHubUsers.map(({ uuid }) => uuid),
        },
      },
    });

    await prisma.gitHubUsers.deleteMany({
      where: {
        installationUuid: githubInstallation.uuid,
      },
    });
  }

  return prisma.gitHubInstallations.delete({
    where: {
      uuid: githubInstallation.uuid,
    },
  });
};

export const accountCreate = async (installationId: number, sender: User) => {
  let gitHubInstallation = await prisma.gitHubInstallations.findFirst({
    where: {
      installationId,
    },
  });

  if (gitHubInstallation) {
    throw new HTTPError('An installation with this ID already exists.', 409);
  }

  gitHubInstallation = await prisma.gitHubInstallations.create({
    data: {
      installationId: installationId,
    },
  });

  await prisma.gitHubUsers.create({
    data: {
      installationUuid: gitHubInstallation.uuid,
      login: sender?.login,
      id: sender?.id,
      nodeId: sender?.node_id,
      avatarUrl: sender?.avatar_url,
      gravatarId: sender?.gravatar_id,
      htmlUrl: sender?.html_url,
      type: sender?.type,
      name: sender?.name,
      email: sender?.email,
    },
  });
};
