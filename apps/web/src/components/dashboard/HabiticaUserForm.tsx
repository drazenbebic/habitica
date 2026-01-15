'use client';

import React, { FC, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AlertCircleIcon, FloppyDiskIcon, Link01Icon } from 'hugeicons-react';
import { toast } from 'sonner';

import { getHabiticaCredentialsAction } from '@/actions/getHabiticaCredentialsAction';
import { updateHabiticaCredentialsAction } from '@/actions/updateHabiticaCredentialsAction';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { FormLabel } from '@/components/ui/FormLabel';
import { Skeleton } from '@/components/ui/Skeleton';

type Credentials = Awaited<ReturnType<typeof getHabiticaCredentialsAction>>;

export const HabiticaUserForm: FC = () => {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchHabiticaCredentials = async () => {
      try {
        const data = await getHabiticaCredentialsAction();

        if (data) {
          setCredentials(data);
        }
      } catch (error) {
        console.error('Failed to load Habitica credentials:', error);
        toast.error('Could not load existing configuration');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabiticaCredentials();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const userId = formData.get('userId') as string;
    const apiToken = formData.get('apiToken') as string;

    try {
      const result = await updateHabiticaCredentialsAction({
        userId,
        apiToken,
      });

      if (result.success) {
        toast.success('Configuration saved successfully');
        router.refresh();
      } else {
        console.error(result.message);
        toast.error(result.message || 'Failed to save configuration');
      }
    } catch (error) {
      console.error(error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <FormLabel as="label" name="userId" htmlFor="userId" isRequired>
          User ID
        </FormLabel>
        {isLoading ? (
          <Skeleton className="h-11.5" variant="circular" />
        ) : (
          <FormInput
            as="input"
            id="userId"
            name="userId"
            defaultValue={credentials?.userId || ''}
            placeholder="e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            leadingIcon={<Link01Icon size={20} />}
            required
          />
        )}
      </div>

      <div>
        <FormLabel as="label" name="apiToken" htmlFor="apiToken" isRequired>
          API Token
        </FormLabel>
        {isLoading ? (
          <Skeleton className="h-11.5" variant="circular" />
        ) : (
          <FormInput
            as="input"
            id="apiToken"
            name="apiToken"
            type="password"
            defaultValue={credentials?.apiToken || ''}
            placeholder="••••••••••••••••••••••••••••••"
            leadingIcon={<AlertCircleIcon size={20} />}
            required
          />
        )}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          isLoading={isSaving}
          disabled={isLoading || isSaving}
        >
          <FloppyDiskIcon size={20} className="mr-2" />
          Save Configuration
        </Button>
      </div>
    </form>
  );
};
