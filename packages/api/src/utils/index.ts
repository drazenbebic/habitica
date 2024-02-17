import { env } from 'process';

export const getHeaders = () => ({
  'X-Api-User': env.HABITICA_USER_ID,
  'X-Api-KEY': env.HABITICA_API_TOKEN,
});
