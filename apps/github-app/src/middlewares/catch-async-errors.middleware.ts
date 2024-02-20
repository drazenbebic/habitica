import { NextFunction, Request, Response } from 'express';

const catchAsyncErrors =
  (
    callback: (
      request: Request,
      response: Response,
      next: NextFunction,
    ) => Promise<void>,
  ) =>
  (request: Request, response: Response, next: NextFunction) =>
    Promise.resolve(callback(request, response, next)).catch(next);

export default catchAsyncErrors;
