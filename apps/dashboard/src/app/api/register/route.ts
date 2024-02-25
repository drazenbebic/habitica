import dotenv from 'dotenv';
import path from 'path';
import { env } from 'process';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

dotenv.config({ path: path.resolve(__dirname, '../../../../../../../.env') });

const handler = async (request: NextRequest) => {
  const { code, installationId, userId, apiToken } = await request.json();

  const { data } = await axios.post(`${env.API_URL}/v1/github/oauth/complete`, {
    code,
    installationId,
    userId,
    apiToken,
  });

  return NextResponse.json(
    {
      success: undefined,
      message: undefined,
      data,
    },
    {
      status: 200,
    },
  );
};

export { handler as POST };
