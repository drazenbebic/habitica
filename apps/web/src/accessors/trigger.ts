'use server';

import prisma from '@/lib/prisma';

import { Prisma } from '../generated/prisma/client';

export const getTrigger = async (
  uuid: string,
  githubUserId: number | bigint,
) => {
  return prisma.triggers.findUnique({
    where: { uuid, githubUserId },
  });
};

export const getTriggers = async (githubUserId: number | bigint) => {
  return prisma.triggers.findMany({
    where: { githubUserId },
    orderBy: {
      id: 'desc',
    },
  });
};

export const deleteTrigger = async (
  uuid: string,
  githubUserId: number | bigint,
) => {
  return prisma.triggers.delete({
    where: { uuid, githubUserId },
  });
};

export const createTrigger = async (
  data: Prisma.TriggersUncheckedCreateInput,
) => {
  return prisma.triggers.create({ data });
};

export const updateTrigger = async (
  where: Prisma.TriggersWhereUniqueInput,
  data: Prisma.TriggersUncheckedUpdateInput,
) => {
  return prisma.triggers.update({
    where,
    data,
  });
};
