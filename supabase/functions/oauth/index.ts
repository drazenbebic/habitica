// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import axios from 'npm:axios@1.7.7';
import { v4 } from 'npm:uuid@10';
import HttpError from '../webhook/http-error.ts';

console.log('Function "oauth" up and running!');

Deno.serve(async req => {
  const { code, installationId, userId, apiToken } = await req.json();

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    // Create client with Auth context of the user that called the function.
    // This way your row-level-security (RLS) policies are applied.
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    },
  );

  const { error: gitHubInstallationError } = await supabase
    .from('hbtc_github_installations')
    .select('*')
    .eq('installation_id', Number(installationId))
    .single();

  if (gitHubInstallationError) {
    throw new HttpError('The GitHub Installation could not be found.', 404);
  }

  const { data: tokenData } = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: Deno.env.get('GITHUB_CLIENT_ID') ?? '',
      client_secret: Deno.env.get('GITHUB_CLIENT_SECRET') ?? '',
      code,
    },
  );

  if (!tokenData) {
    throw new HttpError('Access token could not be fetched.', 404);
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

  const { data: gitHubUser, error: gitHubUserError } = await supabase
    .from('hbtc_github_users')
    .select('*')
    .eq('login', gitHubUserData.login)
    .single();

  if (gitHubUserError) {
    console.error('GITHUB_USER_ERROR', gitHubUserError);
    throw new HttpError('The GitHub user could not be found.', 404);
  }

  const { error: gitHubUsersUpdateError } = await supabase
    .from('hbtc_github_users')
    .update({
      name: gitHubUserData?.name || undefined,
      company: gitHubUserData?.company || undefined,
      blog: gitHubUserData?.blog || undefined,
      location: gitHubUserData?.location || undefined,
      email: gitHubUserData?.email || undefined,
      access_token: params.get('access_token') || undefined,
      expires_in: Number(params.get('expires_in')) || undefined,
      refresh_token: params.get('refresh_token') || undefined,
      refresh_token_expires_in:
        Number(params.get('refresh_token_expires_in')) || undefined,
      scope: params.get('scope') || undefined,
      token_type: params.get('token_type') || undefined,
    })
    .eq('uuid', gitHubUser.uuid)
    .select();

  if (gitHubUsersUpdateError) {
    console.error('GITHUB_USER_UPDATE_ERROR', gitHubUsersUpdateError);
    throw new HttpError('GitHub User could not be updated.', 409);
  }

  const { data: habiticaUser, error: habiticaUserError } = await supabase
    .from('hbtc_habitica_users')
    .insert({
      uuid: v4(),
      github_user_uuid: gitHubUser.uuid,
      user_id: userId,
      api_token: apiToken,
    })
    .select('*');

  if (habiticaUserError) {
    console.error('HABITICA_USER_ERROR', habiticaUserError);
    throw new HttpError('The Habitica user could not be created.', 500);
  }

  const response = JSON.stringify({
    success: true,
    message: 'Habitica user added successfully.',
    data: {
      habiticaUser,
      code,
      installationId,
      userId,
      apiToken,
    },
  });

  return new Response(response, {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/oauth' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
