import { faker } from '@faker-js/faker';
import { v4 } from 'uuid';

import prisma from '../src/lib/prisma';

const AMOUNT_TO_CREATE = 100;

async function createSeededUser(index: number) {
  return prisma.$transaction(async tx => {
    const installationId = faker.number.int({ min: 1, max: 2147483647 });

    const installation = await tx.githubInstallations.create({
      data: {
        uuid: v4(),
        installationId,
      },
    });

    const githubUser = await tx.githubUsers.create({
      data: {
        uuid: v4(),
        installationId: installation.id,
        login: faker.internet.username() + index,
        githubId: faker.number.int({ max: 9999999 }),
        nodeId: faker.string.alphanumeric(20),
        avatarUrl: faker.image.avatar(),
        gravatarId: '',
        htmlUrl: faker.internet.url(),
        type: 'User',
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    });

    await tx.habiticaUsers.create({
      data: {
        uuid: v4(),
        githubUserId: githubUser.id,
        userId: v4(),
        apiToken: faker.string.alphanumeric(32),
      },
    });

    return {
      installationId: installation.installationId,
      user: githubUser.login,
    };
  });
}

async function main() {
  console.log(`🌱 Seeding ${AMOUNT_TO_CREATE} users...`);

  for (let i = 0; i < AMOUNT_TO_CREATE; i++) {
    try {
      const result = await createSeededUser(i);
      console.log(`✅ Created set ${i + 1}: ${result.user}`);
    } catch (error) {
      console.error(`❌ Failed to create set ${i + 1}:`, error);
    }
  }
}

void main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
