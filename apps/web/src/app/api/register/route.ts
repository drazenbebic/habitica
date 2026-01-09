import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';
import { v4 } from 'uuid';

import prisma from '@/lib/prisma';

const gitHubClientId = process.env.GITHUB_CLIENT_ID!;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET!;

const handler = async (request: NextRequest) => {
  const { code, installationId, userId, apiToken } = await request.json();

  const gitHubInstallation = await prisma.gitHubInstallations.findFirst({
    where: { installationId: Number(installationId) },
  });

  if (!gitHubInstallation) {
    return NextResponse.json(
      { message: 'GitHub Installation could not be found.' },
      { status: 500 },
    );
  }

  const { data: tokenData } = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: gitHubClientId,
      client_secret: githubClientSecret,
      code,
    },
  );

  if (!tokenData) {
    return NextResponse.json(
      { message: 'Access token could not be fetched.' },
      { status: 404 },
    );
  }

  const params = new URLSearchParams(tokenData);

  const { data: gitHubUserData } = await axios.get(
    'https://api.github.com/user',
    {
      headers: {
        accept: 'application/vnd.github+json',
        authorization: `Bearer ${params.get('access_token')}`,
        'x-github-api-version': '2022-11-28',
      },
    },
  );

  const gitHubUser = await prisma.gitHubUsers.findFirst({
    where: { login: gitHubUserData.login },
  });

  if (!gitHubUser) {
    return NextResponse.json(
      { message: 'The GitHub user could not be found.' },
      { status: 404 },
    );
  }

  const updatedGitHubUser = await prisma.gitHubUsers.update({
    data: {
      name: gitHubUserData?.name || undefined,
      company: gitHubUserData?.company || undefined,
      blog: gitHubUserData?.blog || undefined,
      location: gitHubUserData?.location || undefined,
      email: gitHubUserData?.email || undefined,
      accessToken: params.get('access_token') || undefined,
      expiresIn: Number(params.get('expires_in')) || undefined,
      refreshToken: params.get('refresh_token') || undefined,
      refreshTokenExpiresIn:
        Number(params.get('refresh_token_expires_in')) || undefined,
      scope: params.get('scope') || undefined,
      tokenType: params.get('token_type') || undefined,
    },
    where: {
      uuid: gitHubUser.uuid,
    },
  });

  if (!updatedGitHubUser) {
    return NextResponse.json(
      { message: 'GitHub User could not be updated.' },
      { status: 404 },
    );
  }

  const habiticaUser = await prisma.habiticaUsers.create({
    data: {
      uuid: v4(),
      gitHubUserUuid: gitHubUser.uuid,
      userId,
      apiToken,
    },
  });

  if (!habiticaUser) {
    return NextResponse.json(
      { message: 'The Habitica User could not be created.' },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: 'Habitica user added successfully.',
      habiticaUser,
      code,
      installationId,
      userId,
      apiToken,
    },
    { status: 200 },
  );
};

export { handler as POST };
