'use client';

import React, { FC, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import { Form, FormSubmit, useFormStore } from '@ariakit/react';
import axios from 'axios';
import { AlertCircleIcon, GithubIcon, Link01Icon } from 'hugeicons-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CardBody } from '@/components/ui/CardBody';
import { Content } from '@/components/ui/Content';
import { FormInput } from '@/components/ui/FormInput';
import { FormLabel } from '@/components/ui/FormLabel';
import { Heading } from '@/components/ui/Heading';

export const InstallationForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const router = useRouter();

  const [values, setValues] = useState({
    userId: '',
    apiToken: '',
  });

  const form = useFormStore({ values, setValues });

  form.useSubmit(async () => {
    setLoading(true);

    try {
      await axios.post('/api/register', {
        code: params.get('code'),
        installationId: params.get('installation_id'),
        userId: values.userId,
        apiToken: values.apiToken,
      });

      toast.success('Setup Complete!', {
        description: 'Your repositories are now synced with Habitica.',
      });

      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration Failed', {
        description: 'Please check your credentials and try again.',
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="mb-10 flex items-center justify-center gap-6">
        <div className="relative flex flex-col items-center gap-3">
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg ring-4 ring-white">
            <GithubIcon size={32} />
            <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-[10px] font-bold text-white">
              ✓
            </div>
          </div>
          <span className="text-sm font-semibold text-slate-600">GitHub</span>
        </div>

        <div className="flex w-24 flex-col items-center justify-center gap-2 pb-6">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="absolute inset-0 w-full animate-[shimmer_1.5s_infinite] bg-linear-to-r from-transparent via-emerald-400 to-transparent" />
          </div>
          <Badge variant="success" size="sm">
            Connected
          </Badge>
        </div>

        <div className="relative flex flex-col items-center gap-3">
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-xl shadow-violet-600/20 ring-4 ring-white">
            <Image
              src="/habitica_white.png"
              alt="Habitica"
              width={32}
              height={32}
            />
          </div>
          <span className="text-sm font-bold text-violet-700">Habitica</span>
        </div>
      </div>

      <Card
        variant="elevated"
        className="mx-auto w-full max-w-md overflow-hidden border-t-4 border-t-violet-500"
      >
        <CardBody className="p-8">
          <div className="mb-8 text-center">
            <Heading level={1} size="xl" className="mb-2">
              Final Step
            </Heading>
            <Content size="sm">
              Enter your API credentials to verify your identity and start
              syncing your commits.
            </Content>
          </div>

          <Form
            resetOnSubmit={false}
            store={form}
            className="flex flex-col gap-5"
          >
            <div>
              <FormLabel name="userId" htmlFor="userId" isRequired>
                User ID
              </FormLabel>
              <FormInput
                id="userId"
                name={form.names.userId}
                placeholder="e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                required
                disabled={loading}
                leadingIcon={<Link01Icon size={20} />}
              />
            </div>

            <div>
              <FormLabel name="apiToken" htmlFor="apiToken" isRequired>
                API Token
              </FormLabel>
              <FormInput
                id="apiToken"
                name={form.names.apiToken}
                type="password"
                placeholder="••••••••••••••••••••••••••••••"
                required
                disabled={loading}
                leadingIcon={<AlertCircleIcon size={20} />}
              />
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
              <p>
                <strong>Where to find these:</strong> Go to
                <a
                  className="mx-1 font-semibold text-violet-600 hover:underline"
                  href="https://habitica.com/user/settings/siteData"
                  target="_blank"
                  rel="noreferrer"
                >
                  Habitica &gt; Settings &gt; API
                </a>
                and look for the &#34;API Token&#34; section.
              </p>
            </div>

            <FormSubmit
              render={
                <Button
                  className="w-full mt-2"
                  size="lg"
                  isLoading={loading}
                  disabled={loading}
                >
                  Connect & Sync
                </Button>
              }
            />
          </Form>
        </CardBody>
      </Card>

      <p className="mt-8 text-center text-xs text-slate-400">
        By connecting, you agree to our standard terms of service.
      </p>
    </div>
  );
};
