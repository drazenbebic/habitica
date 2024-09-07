// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import crypto from 'node:crypto';

console.log('Function "webhook" up and running!');

Deno.serve(async req => {
  const secret = Deno.env.get('GITHUB_WEBHOOK_SECRET'); // Set this in your environment variables

  console.log('DEBUG: SECRET', secret);

  // Get the `X-Hub-Signature` from the headers
  const signature = req.headers.get('X-Hub-Signature');

  console.log('DEBUG: SIGNATURE', signature);

  if (!signature || !secret) {
    return new Response('Webhook signature verification failed.', {
      status: 401,
    });
  }

  // Read the raw body of the request
  const body = await req.text();

  // Compute the HMAC using the secret
  const hmac = crypto.createHmac('sha1', secret);
  hmac.update(body);
  const hash = `sha1=${hmac.toString('hex')}`;

  // Compare the computed HMAC with the received signature
  if (signature !== hash) {
    return new Response('Webhook signature verification failed.', {
      status: 401,
    });
  }

  const deliveryUuid = req.headers.get('x-github-delivery');
  const event = req.headers.get('x-github-event');
  const hookId = req.headers.get('x-github-hook-id');
  const payload = await req.json();

  return new Response(
    JSON.stringify({ deliveryUuid, event, hookId, payload }),
    {
      status: 202,
      headers: { 'Content-Type': 'application/json' },
    },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/webhook' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
