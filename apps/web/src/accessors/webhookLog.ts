'use server';

import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export const createWebhookLog = async (
  data: Prisma.WebhookLogsUncheckedCreateInput,
) => {
  return prisma.webhookLogs.create({ data });
};

export const getWebhookLogs = async (githubUserId: number | bigint) => {
  return prisma.webhookLogs.findMany({
    where: { githubUserId },
    orderBy: {
      id: 'desc',
    },
  });
};
