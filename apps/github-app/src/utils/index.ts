import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };
export { default as HTTPError } from './http-error';
export { default as getTaskByName } from './getTaskByName';
export * from './account';
