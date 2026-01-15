'use client';

import { useEffect, useState } from 'react';

import { isConnectedAction } from '@/actions/isConnectedAction';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';

export const IsConnected = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIsConnected = async () => {
      try {
        const status = await isConnectedAction();
        setIsConnected(status);
      } catch (error) {
        console.error('Failed to check connection status:', error);
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIsConnected();
  }, []);

  if (isLoading) {
    return <Skeleton variant="circular" className="h-9 w-32" />;
  }

  return (
    <Badge
      variant={isConnected ? 'success' : 'neutral'}
      size="md"
      hasDot
      pulsing={!!isConnected}
      className="px-4 py-2"
    >
      {isConnected ? 'Connected' : 'Not Connected'}
    </Badge>
  );
};
