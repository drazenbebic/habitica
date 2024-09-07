// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';
import EventHandler from './event-handler.ts';
import { Database } from './database.types.ts';

console.log('Function "webhook" up and running!');

Deno.serve(async req => {
  // const secret = Deno.env.get('GITHUB_WEBHOOK_SECRET'); // Set this in your environment variables
  // const signature = req.headers.get('X-Hub-Signature');

  // TODO: Webhook Secret Check.

  const supabase = createClient<Database>(
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

  const deliveryUuid = req.headers.get('x-github-delivery');
  const event = req.headers.get('x-github-event') || '';
  const hookId = req.headers.get('x-github-hook-id') || '';
  const payload = await req.json();
  const eventHandler = new EventHandler(supabase);

  console.log('Habitica - Webhook Triggered.', {
    deliveryUuid,
    event,
    hookId,
    payload,
  });

  const eventHandlers = {
    installation: eventHandler.installation,
    issue_comment: eventHandler.issueComment,
    issues: eventHandler.issues,
    pull_request: eventHandler.pullRequest,
    pull_request_review: eventHandler.pullRequestReview,
    push: eventHandler.push,
    registry_package: eventHandler.registryPackage,
    workflow_job: eventHandler.workflowJob,
    workflow_run: eventHandler.workflowRun,
  };

  if (Object.prototype.hasOwnProperty.call(eventHandlers, event)) {
    await eventHandlers[event](payload, supabase);
  }

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
