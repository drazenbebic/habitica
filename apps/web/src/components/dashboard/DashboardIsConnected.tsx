'use client';

import { startTransition, useActionState, useEffect } from 'react';

import { isConnected } from '@/app/actions/is-connected';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

export const DashboardIsConnected = () => {
  const [connected, action, isPending] = useActionState(isConnected, null);

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
