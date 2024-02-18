import catchAsyncErrors from './catch-async-errors.middleware';
import chalk from 'chalk';
import moment from 'moment';

const loggerMiddleware = catchAsyncErrors(async (request, response, next) => {
  const deliveryUuid = request.header('x-github-delivery');
  const event = request.header('x-github-event');
  const hookId = request.header('x-github-hook-id');
  const action = request.body?.action;

  if (deliveryUuid && event && hookId) {
    console.info(
      '📦',
      chalk.hex('#008a76')(`[${moment.utc().format('YYYY-MM-DD HH:mm:ss')}]`),
      chalk.hex('#6fadf3')(`[${deliveryUuid}]`),
      chalk.hex('#6ff389')(action ? `[${event}.${action}]` : `[${event}]`),
      chalk.hex('#c3f36f')(`[${hookId}]`),
    );
  }

  next();
});

export default loggerMiddleware;
