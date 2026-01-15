'use client';

import { startTransition, useActionState, useEffect } from 'react';

import { isConnectedAction } from '@/app/actions/is-connected-action';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

export const IsConnected = () => {
  const [connected, action, isPending] = useActionState(
    isConnectedAction,
    null,
  );

  useEffect(() => {
    startTransition(() => {
      action();
    });
  }, [action]);

  if (isPending || connected === null) {
    return <Skeleton variant="circular" className="h-9 w-32" />;
  }

  return (
    <Badge
      variant={connected ? 'success' : 'neutral'}
      size="md"
      hasDot
      pulsing={connected}
      className="px-4 py-2"
    >
      {connected ? 'Connected' : 'Not Connected'}
    </Badge>
  );
};
