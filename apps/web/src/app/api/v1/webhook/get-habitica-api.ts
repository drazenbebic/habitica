import prisma from '@/lib/prisma';

import HabiticaApi from './habitica-api';

const getHabiticaApi = async (
  installationId: number,
  login: string,
): Promise<HabiticaApi | null> => {
  const gitHubInstallation = await prisma.githubInstallations.findFirst({
    where: { installationId: Number(installationId) },
  });

  if (!gitHubInstallation) {
    return null;
  }

  const gitHubUser = await prisma.githubUsers.findFirst({
    where: { installationId: gitHubInstallation.id, login },
  });

  if (!gitHubUser) {
    return null;
  }

  const habiticaUser = await prisma.habiticaUsers.findFirst({
    where: { githubUserId: gitHubUser.id },
  });

  if (!habiticaUser) {
    return null;
  }

  if (!habiticaUser?.userId || !habiticaUser?.apiToken) {
    console.error(
      'Habitica user is missing user_id or api_token',
      habiticaUser,
    );
  }

  return new HabiticaApi(habiticaUser.userId, habiticaUser.apiToken);
};

export default getHabiticaApi;
