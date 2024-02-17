import catchAsyncErrors from './catch-async-errors.middleware';
import crypto from 'crypto';
import { HTTPError } from '../utils';
import { env } from 'process';

const webhookAuthMiddleware = catchAsyncErrors(
  async (request, response, next) => {
    const signature = request.header('x-hub-signature');
    const body = JSON.stringify(request.body);

    if (!env.WEBHOOK_SECRET || !signature) {
      return next(new HTTPError('Webhook signature verification failed.', 401));
    }

    const hmac = crypto.createHmac('sha1', env.WEBHOOK_SECRET);
    const digest = Buffer.from(
      'sha1=' + hmac.update(body).digest('hex'),
      'utf8',
    );
    const checksum = Buffer.from(signature, 'utf8');

    if (!crypto.timingSafeEqual(digest, checksum)) {
      return next(new HTTPError('Webhook signature verification failed.', 401));
    }

    return next();
  },
);

export default webhookAuthMiddleware;
