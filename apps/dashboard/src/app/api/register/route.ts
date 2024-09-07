import { env } from 'process';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const handler = async (request: NextRequest) => {
  const { code, installationId, userId, apiToken } = await request.json();

  const bearerToken = env.SUPABASE_FUNCTIONS_BEARER_TOKEN;
  const baseUrl = env.SUPABASE_FUNCTIONS_BASE_URL;

  const { data } = await axios.post(
    `${baseUrl}/functions/v1/oauth`,
    {
      code,
      installationId,
      userId,
      apiToken,
    },
    {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    },
  );

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
