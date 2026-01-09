import prisma from '@/lib/prisma';

import HabiticaApi from './habitica-api';

const getHabiticaApi = async (
  installationId: number,
  login: string,
): Promise<HabiticaApi | null> => {
  const gitHubInstallation = await prisma.gitHubInstallations.findFirst({
    where: { installationId: Number(installationId) },
  });

  if (!gitHubInstallation) {
    return null;
  }

  const gitHubUser = await prisma.gitHubUsers.findFirst({
    where: { installationUuid: gitHubInstallation.uuid, login },
  });

  if (!gitHubUser) {
    return null;
  }

  const habiticaUser = await prisma.habiticaUsers.findFirst({
    where: { gitHubUserUuid: gitHubUser.uuid },
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
