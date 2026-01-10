import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function getUserProfile() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.name) return null;

  const user = await prisma.githubUsers.findUnique({
    where: { login: session.user.name },
    include: {
      habiticaUser: true,
      installation: true,
    },
  });

  if (!user) return null;

  return {
    name: user.name || user.login,
    handle: user.login,
    avatar: user.avatarUrl,
    location: user.location,
    company: user.company,
    website: user.blog,
    email: user.email,
    joinedAt: user.id,
    isLinked: !!user.habiticaUser,
    hasInstallation: !!user.installation && !user.installation.suspended,
    githubUrl: user.htmlUrl,
  };
}
