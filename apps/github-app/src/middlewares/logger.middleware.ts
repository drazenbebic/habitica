import catchAsyncErrors from './catch-async-errors.middleware';
import chalk from 'chalk';
import moment from 'moment';

const loggerMiddleware = catchAsyncErrors(async (request, response, next) => {
  const deliveryUuid = request.header('X-GitHub-Delivery');
  const event = request.header('X-GitHub-Event');
  const hookId = request.header('X-GitHub-Hook-ID');

  console.info(
    chalk.hex('#008a76')(`[${moment.utc().format('YYYY-MM-DD HH:mm:ss')}]`),
    chalk.hex('#6fadf3')(`[${deliveryUuid}]`),
    chalk.hex('#6ff389')(`[${event}]`),
    chalk.hex('#c3f36f')(`[${hookId}]`),
  );

  next();
});

export default loggerMiddleware;
