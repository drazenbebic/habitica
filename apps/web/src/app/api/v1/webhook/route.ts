import { NextRequest, NextResponse } from 'next/server';

import { WebhookEventMap } from '@octokit/webhooks-types';
import crypto from 'crypto';

import EventHandler from './event-handler';

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET!;

const handler = async (request: NextRequest) => {
  const headers = request.headers;
  const signature = headers.get('x-hub-signature-256');
  const deliveryUuid = headers.get('x-github-delivery');
  const event = headers.get('x-github-event') || '';
  const hookId = headers.get('x-github-hook-id') || '';
  const rawBody = await request.text();

  if (!signature) {
    return new NextResponse('Missing Signature', { status: 401 });
  }

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = Buffer.from(
    'sha256=' + hmac.update(rawBody).digest('hex'),
    'utf8',
  );
  const checksum = Buffer.from(signature, 'utf8');

  if (
    checksum.length !== digest.length ||
    !crypto.timingSafeEqual(digest, checksum)
  ) {
    return new NextResponse('Invalid Signature', { status: 401 });
  }

  const payload = JSON.parse(rawBody);

  const eventHandler = new EventHandler();

  console.info('Webhook Triggered.', {
    deliveryUuid,
    event,
    hookId,
  });

  type EventHandlerInterface = {
    [K in keyof WebhookEventMap]?: (event: WebhookEventMap[K]) => Promise<void>;
  };

  const eventHandlers: EventHandlerInterface = {
    installation: eventHandler.installation,
    meta: eventHandler.meta,
    issue_comment: eventHandler.issueComment,
    issues: eventHandler.issues,
    pull_request: eventHandler.pullRequest,
    pull_request_review: eventHandler.pullRequestReview,
    push: eventHandler.push,
    registry_package: eventHandler.registryPackage,
    release: eventHandler.release,
    repository: eventHandler.repository,
    workflow_dispatch: eventHandler.workflowDispatch,
    workflow_job: eventHandler.workflowJob,
    workflow_run: eventHandler.workflowRun,
  };

  if (Object.prototype.hasOwnProperty.call(eventHandlers, event)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    await eventHandlers[event](payload);
  }

  return NextResponse.json(
    { deliveryUuid, event, hookId, message: 'Processed' },
    { status: 202 },
  );
};

export { handler as GET, handler as POST };
