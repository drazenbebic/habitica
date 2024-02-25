import { PrismaClient } from '@prisma/client';
import { HabiticaApi } from '@habitica/core';

const prisma = new PrismaClient();

export const getHabiticaApi = async (
  installationId: number,
  login: string,
): Promise<HabiticaApi | undefined> => {
  const githubInstallation = await prisma.gitHubInstallations.findFirst({
    where: {
      installationId,
    },
    include: {
      gitHubUsers: {
        where: {
          login,
        },
        include: {
          habiticaUser: true,
        },
      },
    },
  });

  if (
    !githubInstallation ||
    githubInstallation.gitHubUsers.length !== 1 ||
    !githubInstallation.gitHubUsers[0].habiticaUser
  ) {
    return undefined;
  }

  const { habiticaUser } = githubInstallation.gitHubUsers[0];

  if (!habiticaUser) {
    return undefined;
  }

  return new HabiticaApi(habiticaUser.userId, habiticaUser.apiToken);
};

export { prisma };
export { default as HTTPError } from './http-error';
export { default as getTaskByName } from './getTaskByName';
export * from './account';
