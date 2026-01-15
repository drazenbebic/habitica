'use server';

import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export const createWebhookLog = async (
  data: Prisma.WebhookLogsUncheckedCreateInput,
) => {
  return prisma.webhookLogs.create({ data });
};
