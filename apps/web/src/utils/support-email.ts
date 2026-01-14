import { env } from 'process';

export const supportEmail = () => {
  return env.NEXT_PUBLIC_SUPPORT_EMAIL!;
};
