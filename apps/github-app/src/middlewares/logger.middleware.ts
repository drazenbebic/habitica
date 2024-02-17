import catchAsyncErrors from './catch-async-errors.middleware';
import chalk from 'chalk';
import moment from 'moment';

const loggerMiddleware = catchAsyncErrors(async (request, response, next) => {
  console.info(
    chalk.hex('#6FF3DF')(`[${moment.utc().format('YYYY-MM-DD HH:mm:ss')}]`),
    chalk.hex('#6FF3DF')('@habitica/github-app'),
    chalk.hex('#6FF3DF')(`${request.method} @ ${request.originalUrl}`),
    chalk.hex('#6FF3DF')(request.body),
  );

  next();
});

export default loggerMiddleware;
