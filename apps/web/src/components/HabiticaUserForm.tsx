'use client';

import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

import { AlertCircleIcon, FloppyDiskIcon, Link01Icon } from 'hugeicons-react';

import { updateHabiticaCredentials } from '@/app/actions/update-habitica-credentials';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { FormLabel } from '@/components/ui/FormLabel';

type HabiticaCredentials = {
  userId: string;
  apiToken: string;
};

type HabiticaUserFormProps = {
  initialData?: HabiticaCredentials | null;
};

export const HabiticaUserForm: FC<HabiticaUserFormProps> = ({
  initialData,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const userId = formData.get('userId') as string;
    const apiToken = formData.get('apiToken') as string;

    const result = await updateHabiticaCredentials({ userId, apiToken });

    if (result.success) {
      router.refresh();
    } else {
      console.error(result.message);
      // TODO: Toast notification
    }

    setIsSaving(false);
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
          defaultValue={initialData?.userId}
          placeholder="e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          leadingIcon={<Link01Icon size={20} />}
          required
        />
        <p className="mt-2 text-xs text-slate-500">
          Find this in Habitica &gt; Settings &gt; API.
        </p>
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
          defaultValue={initialData?.apiToken}
          placeholder="••••••••••••••••••••••••••••••"
          leadingIcon={<AlertCircleIcon size={20} />}
          required
        />
      </div>

      <div className="pt-2">
        <Button type="submit" isLoading={isSaving}>
          <FloppyDiskIcon size={20} className="mr-2" />
          Save Configuration
        </Button>
      </div>
    </form>
  );
};
