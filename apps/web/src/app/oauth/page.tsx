'use client';

import React, { FC, Suspense, useState } from 'react';
import { NextPage } from 'next';
import { useSearchParams } from 'next/navigation';

import { Form, FormSubmit, useFormStore } from '@ariakit/react';
import axios from 'axios';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CardBody } from '@/components/ui/CardBody';
import { Content } from '@/components/ui/Content';
import { FormInput } from '@/components/ui/FormInput';
import { FormLabel } from '@/components/ui/FormLabel';
import { Heading } from '@/components/ui/Heading';

const HabiticaForm: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const [values, setValues] = useState({
    userId: '',
    apiToken: '',
  });
  const form = useFormStore({ values, setValues });

  form.useSubmit(() => {
    setLoading(true);
    axios
      .post('/api/register', {
        code: params.get('code'),
        installationId: params.get('installation_id'),
        userId: values.userId,
        apiToken: values.apiToken,
      })
      .then(response => {
        console.log('response:', response);
      })
      .catch(error => {
        console.error('error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <Card className="max-w-96 mx-auto mt-20">
      <CardBody className="relative grid">
        <Heading className="text-center mb-4" size="xl">
          Add Habitica credentials
        </Heading>
        <Content className="mb-4">
          To complete the registration process, please enter your{' '}
          <strong>Habitica User ID and API Token</strong>. These will be
          associated with your GitHub username.
        </Content>
        <Form resetOnSubmit={false} store={form}>
          <div className="mb-4">
            <FormLabel
              className="block text-sm mb-1 font-semibold text-slate-700"
              name={form.names.userId}
            >
              User ID
            </FormLabel>
            <FormInput
              className="block w-full text-lg py-2 px-6 rounded-full"
              required
              disabled={loading}
              name={form.names.userId}
            />
          </div>
          <div className="mb-4">
            <FormLabel
              className="block text-sm mb-1 font-semibold text-slate-700"
              name={form.names.apiToken}
            >
              API token
            </FormLabel>
            <FormInput
              className="block w-full text-lg py-2 px-6 rounded-full"
              required
              disabled={loading}
              name={form.names.apiToken}
            />
          </div>
          <p className="text-slate-700 text-sm mb-8">
            You can find the User ID and API token{' '}
            <a
              className="underline hover:no-underline"
              href="https://habitica.com/user/settings/siteData"
              target="_blank"
            >
              here
            </a>
            .
          </p>
          <FormSubmit
            render={
              <Button className="w-full" isLoading={loading} disabled={loading}>
                Submit
              </Button>
            }
          />
        </Form>
      </CardBody>
    </Card>
  );
};

const OAuth: NextPage = () => {
  return (
    <Suspense>
      <HabiticaForm />
    </Suspense>
  );
};

export default OAuth;
