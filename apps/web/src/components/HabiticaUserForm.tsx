'use client';

import { useState } from 'react';

import { Form, useFormStore } from '@ariakit/react';
import { AlertCircleIcon, FloppyDiskIcon, Link01Icon } from 'hugeicons-react';

import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { FormLabel } from '@/components/ui/FormLabel';

export const HabiticaUserForm = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [values, setValues] = useState({ userId: '', apiToken: '' });
  const form = useFormStore({ values, setValues });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <Form store={form} onSubmit={handleSave} className="flex flex-col gap-6">
      <div>
        <FormLabel name="userId" isRequired>
          User ID
        </FormLabel>
        <FormInput
          id="userId"
          name="userId"
          placeholder="e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          leadingIcon={<Link01Icon size={20} />}
        />
        <p className="mt-2 text-xs text-slate-500">
          Find this in Habitica &gt; Settings &gt; API.
        </p>
      </div>

      <div>
        <FormLabel name="apiToken" isRequired>
          API Token
        </FormLabel>
        <FormInput
          id="apiToken"
          name="apiToken"
          type="password"
          placeholder="••••••••••••••••••••••••••••••"
          leadingIcon={<AlertCircleIcon size={20} />}
        />
      </div>

      <div className="pt-2">
        <Button type="submit" isLoading={isSaving}>
          <FloppyDiskIcon size={20} className="mr-2" />
          Save Configuration
        </Button>
      </div>
    </Form>
  );
};
