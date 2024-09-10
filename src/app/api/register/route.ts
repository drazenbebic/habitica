import { env } from 'process';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

const handler = async (request: NextRequest) => {
  let data;
  const { code, installationId, userId, apiToken } = await request.json();
  const bearerToken = env.SUPABASE_FUNCTIONS_BEARER_TOKEN;
  const baseUrl = env.SUPABASE_FUNCTIONS_BASE_URL;

  try {
    const { data: response } = await axios.post(
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
    data = response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: undefined,
        data: null,
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: 'Habitica User ID and API Token added successfully.',
      data,
    },
    {
      status: 200,
    },
  );
};

export { handler as POST };
