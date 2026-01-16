'use client';

import React, { FC, FormEvent, useEffect } from 'react';

import { AlertCircleIcon, FloppyDiskIcon, Link01Icon } from 'hugeicons-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { FormLabel } from '@/components/ui/FormLabel';
import { useHabiticaStore } from '@/store/useHabiticaStore';

export const HabiticaUserForm: FC = () => {
  const {
    habiticaCredentials,
    fetchHabiticaCredentials,
    fetchHabiticaConnection,
    fetchHabiticaStats,
    upsertHabiticaUser,
    isLoading,
    setIsLoading,
  } = useHabiticaStore();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchHabiticaCredentials();
      await fetchHabiticaConnection();
      setIsLoading(false);
    })();
  }, [fetchHabiticaCredentials, fetchHabiticaConnection, setIsLoading]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userId = formData.get('userId') as string;
    const apiToken = formData.get('apiToken') as string;

    const success = await upsertHabiticaUser({
      userId,
      apiToken,
    });

    if (!success) {
      setIsLoading(false);
      return;
    }

    await Promise.all([fetchHabiticaConnection(), fetchHabiticaStats()]);

    setIsLoading(false);
    toast.success('Configuration saved successfully');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <FormLabel as="label" name="userId" htmlFor="userId" isRequired>
          User ID
        </FormLabel>
        <FormInput
          as="input"
          id="userId"
          name="userId"
          disabled={isLoading}
          defaultValue={habiticaCredentials?.userId || ''}
          placeholder="e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          leadingIcon={<Link01Icon size={20} />}
          required
        />
      </div>

      <div>
        <FormLabel as="label" name="apiToken" htmlFor="apiToken" isRequired>
          API Token
        </FormLabel>
        <FormInput
          as="input"
          id="apiToken"
          name="apiToken"
          type="password"
          disabled={isLoading}
          defaultValue={habiticaCredentials?.apiToken || ''}
          placeholder="••••••••••••••••••••••••••••••"
          leadingIcon={<AlertCircleIcon size={20} />}
          required
        />
      </div>

      <div className="pt-2">
        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          <FloppyDiskIcon size={20} className="mr-2" />
          Save Configuration
        </Button>
      </div>
    </form>
  );
};
