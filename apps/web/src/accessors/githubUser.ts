'use server';

import prisma from '@/lib/prisma';

import { Prisma } from '../generated/prisma/client';

export const getGithubUser = async <T extends Prisma.GithubUsersInclude>(
  where: Prisma.GithubUsersWhereUniqueInput,
  include?: T,
) => {
  const user = await prisma.githubUsers.findUnique({
    where,
    include,
  });

  return user as Prisma.GithubUsersGetPayload<{ include: T }> | null;
};

export const getGithubUserUserByLogin = async <
  T extends Prisma.GithubUsersInclude,
>(
  login: string,
  include?: T,
) => {
  const user = await getGithubUser({ login }, include);

  return user as Prisma.GithubUsersGetPayload<{ include: T }> | null;
};

export const getGithubUserBySenderId = async <
  T extends Prisma.GithubUsersInclude,
>(
  senderId: number,
  include?: T,
) => {
  const user = await getGithubUser({ githubId: senderId }, include);

  return user as Prisma.GithubUsersGetPayload<{ include: T }> | null;
};

export const getLinkedGithubUsers = async (usernames: string[]) => {
  return await prisma.githubUsers.findMany({
    where: {
      login: { in: usernames },
      habiticaUser: { isNot: null },
    },
    include: {
      habiticaUser: true,
    },
  });
};
