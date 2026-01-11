'use server';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { getInstallationOctokit } from '@/lib/github';
import prisma from '@/lib/prisma';

export type ConnectedRepo = {
  id: number;
  name: string;
  fullName: string;
  private: boolean;
  htmlUrl: string;
};

export async function getConnectedRepos(): Promise<ConnectedRepo[]> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.name) {
    return [];
  }

  const user = await prisma.githubUsers.findUnique({
    where: { login: session.user.name },
    include: { installation: true },
  });

  if (!user?.installation?.installationId) {
    return [];
  }

  try {
    const octokit = await getInstallationOctokit(
      user.installation.installationId,
    );

    const response = await octokit.request('GET /installation/repositories', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    return response.data.repositories.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      private: repo.private,
      htmlUrl: repo.html_url,
    }));
  } catch (error) {
    console.error('Failed to fetch repos:', error);
    return [];
  }
}
