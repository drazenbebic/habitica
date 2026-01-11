'use client';

import React, {
  FC,
  FormEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

import { AlertCircleIcon, FloppyDiskIcon, Link01Icon } from 'hugeicons-react';
import { toast } from 'sonner';

import { getHabiticaCredentials } from '@/app/actions/get-habitica-credentials';
import { updateHabiticaCredentials } from '@/app/actions/update-habitica-credentials';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { FormLabel } from '@/components/ui/FormLabel';
import { Skeleton } from '@/components/ui/Skeleton';

export const DashboardHabiticaUserForm: FC = () => {
  const [credentials, trigger, isPending] = useActionState(
    getHabiticaCredentials,
    null,
  );
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
      trigger();
    });
  }, [trigger]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const userId = formData.get('userId') as string;
    const apiToken = formData.get('apiToken') as string;

    const result = await updateHabiticaCredentials({ userId, apiToken });

    if (result.success) {
      toast.success('Configuration saved successfully');
      router.refresh();
    } else {
      console.error(result.message);
      toast.error(result.message || 'Something went wrong');
    }

    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <FormLabel as="label" name="userId" htmlFor="userId" isRequired>
          User ID
        </FormLabel>
        {isPending ? (
          <Skeleton className="h-11.5" variant="circular" />
        ) : (
          <FormInput
            as="input"
            id="userId"
            name="userId"
            defaultValue={credentials?.userId}
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
        {isPending ? (
          <Skeleton className="h-11.5" variant="circular" />
        ) : (
          <FormInput
            as="input"
            id="apiToken"
            name="apiToken"
            type="password"
            defaultValue={credentials?.apiToken}
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
          disabled={isPending || isSaving}
        >
          <FloppyDiskIcon size={20} className="mr-2" />
          Save Configuration
        </Button>
      </div>
    </form>
  );
};
