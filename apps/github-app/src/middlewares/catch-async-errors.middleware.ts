import { NextFunction, Request, Response } from 'express';

interface HabiticaRequest extends Request {
  habitica: {
    userId: string;
    apiToken: string;
  };
}

const catchAsyncErrors =
  (
    callback: (
      request: HabiticaRequest,
      response: Response,
      next: NextFunction,
    ) => Promise<void>,
  ) =>
  (request: HabiticaRequest, response: Response, next: NextFunction) =>
    Promise.resolve(callback(request, response, next)).catch(next);

export default catchAsyncErrors;
