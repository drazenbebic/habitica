'use server';

import prisma from '@/lib/prisma';

import { Prisma } from '../generated/prisma/client';

export const getWebhookTrigger = async (
  uuid: string,
  githubUserId: number | bigint,
) => {
  return prisma.webhookTriggers.findUnique({
    where: { uuid, githubUserId },
  });
};

export const getWebhookTriggers = async (githubUserId: number | bigint) => {
  return prisma.webhookTriggers.findMany({
    where: { githubUserId },
    orderBy: {
      id: 'desc',
    },
  });
};

export const deleteWebhookTrigger = async (
  uuid: string,
  githubUserId: number | bigint,
) => {
  return prisma.webhookTriggers.delete({
    where: { uuid, githubUserId },
  });
};

export const createWebhookTrigger = async (
  data: Prisma.WebhookTriggersUncheckedCreateInput,
) => {
  return prisma.webhookTriggers.create({ data });
};

export const updateWebhookTrigger = async (
  where: Prisma.WebhookTriggersWhereUniqueInput,
  data: Prisma.WebhookTriggersUncheckedUpdateInput,
) => {
  return prisma.webhookTriggers.update({
    where,
    data,
  });
};
