// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import axios from 'npm:axios@1.7.7';

console.log('Function "oauth" up and running!');

Deno.serve(async req => {
  const { code, installationId, userId, apiToken } = await req.json();

  console.log('Habitica - REQUEST_DATA:', {
    code,
    installationId,
    userId,
    apiToken,
  });

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

  // Find GitHub Installation...
  const { data, error } = await supabase
    .from('hbtc_github_installations')
    .select('*')
    .eq('installation_id', Number(installationId))
    .single();

  if (error) {
    console.error('Habitica - GitHub Installation could not be found.', {
      code,
      installationId,
      userId,
      apiToken,
    });
    return new Response('The GitHub installation could not be found.', {
      status: 404,
    });
  }

  const { data: tokenData } = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: Deno.env.get('GITHUB_CLIENT_ID') ?? '',
      client_secret: Deno.env.get('GITHUB_CLIENT_SECRET') ?? '',
      code,
    },
  );

  console.log('Habitica - GitHub Token Data:', { tokenData });

  const response = JSON.stringify({
    code,
    installationId,
    userId,
    apiToken,
  });

  return new Response(response, {
    headers: { 'Content-Type': 'application/json' },
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
