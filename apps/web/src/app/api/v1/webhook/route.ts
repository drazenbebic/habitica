import { NextRequest, NextResponse } from 'next/server';
import { after } from 'next/server';

import { Webhooks } from '@octokit/webhooks';

import { requestContext } from '@/lib/context';
import logger from '@/lib/logger';
import { withRetry } from '@/utils/with-retry';

import { handleInstallationCreated } from './handlers/handle-installation-created';
import { handleInstallationDeleted } from './handlers/handle-installation-deleted';
import { handleInstallationSuspend } from './handlers/handle-installation-suspend';
import { handleInstallationUnsuspend } from './handlers/handle-installation-unsuspend';
import { handleLogWebhook } from './handlers/handle-log-webhook';
import { handlePullRequestClosed } from './handlers/handle-pull-request-closed';
import { handlePullRequestReviewSubmitted } from './handlers/handle-pull-request-review-submitted';
import { handlePush } from './handlers/handle-push';

const webhooks = new Webhooks({
  secret: process.env.GITHUB_WEBHOOK_SECRET!,
});

webhooks.onAny(handleLogWebhook);

webhooks.on('installation.created', handleInstallationCreated);
webhooks.on('installation.deleted', handleInstallationDeleted);
webhooks.on('installation.suspend', handleInstallationSuspend);
webhooks.on('installation.unsuspend', handleInstallationUnsuspend);
webhooks.on('pull_request.closed', handlePullRequestClosed);
webhooks.on('pull_request_review.submitted', handlePullRequestReviewSubmitted);
webhooks.on('push', handlePush);

webhooks.onError(error => {
  logger.error({ error }, '[Webhook Library Error]');
});

export const maxDuration = 60;

export const dynamic = 'force-dynamic';

export const POST = async (request: NextRequest) => {
  const signature = request.headers.get('x-hub-signature-256')!;
  const id = request.headers.get('x-github-delivery')!;
  const eventName = request.headers.get('x-github-event')!;
  const hookId = request.headers.get('x-github-hook-id')!;
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
            webhooks.verifyAndReceive({
              id,
              name: eventName,
              payload: rawBody,
              signature,
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
