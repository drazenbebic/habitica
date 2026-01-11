import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';

import {
  EmitterWebhookEvent,
  EmitterWebhookEventName,
  Webhooks,
} from '@octokit/webhooks';

import { requestContext } from '@/lib/context';
import logger from '@/lib/logger';
import { withRetry } from '@/utils/with-retry';

import { handleInstallationCreated } from './handlers/handle-installation-created';
import { handleInstallationDeleted } from './handlers/handle-installation-deleted';
import { handleInstallationSuspend } from './handlers/handle-installation-suspend';
import { handleInstallationUnsuspend } from './handlers/handle-installation-unsuspend';
import { handleLogWebhook } from './handlers/handle-log-webhook';
import { handlePackagePublished } from './handlers/handle-package-published';
import { handlePullRequestClosed } from './handlers/handle-pull-request-closed';
import { handlePullRequestReviewSubmitted } from './handlers/handle-pull-request-review-submitted';
import { handlePush } from './handlers/handle-push';

const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET!,
});

const webhookHandlerMap: Partial<{
  [K in EmitterWebhookEventName]: (
    params: EmitterWebhookEvent<K>,
  ) => Promise<void>;
}> = {
  'installation.created': handleInstallationCreated,
  'installation.deleted': handleInstallationDeleted,
  'installation.suspend': handleInstallationSuspend,
  'installation.unsuspend': handleInstallationUnsuspend,
  'package.published': handlePackagePublished,
  'pull_request.closed': handlePullRequestClosed,
  'pull_request_review.submitted': handlePullRequestReviewSubmitted,
  push: handlePush,
};

for (const [event, handler] of Object.entries(webhookHandlerMap)) {
  webhooks.on(
    event as EmitterWebhookEventName,
    handler as (params: EmitterWebhookEvent) => Promise<void>,
  );
}

webhooks.onAny(async event => {
  const supportedWebhooks = Object.keys(webhookHandlerMap);

  if (!supportedWebhooks.includes(event.name)) {
    logger.info({ eventName: event.name }, 'Unsupported Webhook. Not logged.');
    return;
  }

  await handleLogWebhook(event);
});

webhooks.onError(error => {
  logger.error({ error }, 'Webhook Library Error');
});

export const maxDuration = 60;

export const dynamic = 'force-dynamic';

export const POST = async (request: NextRequest) => {
  const signature = request.headers.get('x-hub-signature-256') ?? '';
  const id = request.headers.get('x-github-delivery') ?? '';
  const eventName = request.headers.get('x-github-event') ?? '';
  const hookId = request.headers.get('x-github-hook-id') ?? '';
  const rawBody = await request.text();

  const isValid = await webhooks.verify(rawBody, signature);

  if (!isValid) {
    logger.warn('Invalid signature received');
    return new NextResponse('Invalid Signature', { status: 401 });
  }

  after(async () => {
    await requestContext.run(
      { requestId: id, eventName, signature, hookId },
      async () => {
        try {
          logger.info('Processing in background.');

          await withRetry(() =>
            webhooks.receive({
              id,
              // @ts-expect-error Just a type mismatch
              name: eventName,
              payload: JSON.parse(rawBody),
            }),
          );

          logger.info('Processed successfully.');
        } catch (error) {
          logger.error({ error }, 'Background processing failed.');
        }
      },
    );
  });

  return NextResponse.json(
    { message: 'Accepted', deliveryUuid: id },
    { status: 202 },
  );
};
