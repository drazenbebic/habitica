import { AsyncLocalStorage } from 'node:async_hooks';

interface RequestContext {
  requestId: string;
  eventName: string;
  signature: string;
  hookId: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

export const getRequestContext = () => {
  return requestContext.getStore();
};
