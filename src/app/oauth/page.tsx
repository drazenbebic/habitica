'use client';

import { NextPage } from 'next';
import React, { FC, Suspense, useState } from 'react';
import {
  Form,
  FormInput,
  FormLabel,
  FormSubmit,
  useFormStore,
} from '@ariakit/react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

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
    <div className="flex flex-col p-4 max-w-96 mx-auto mt-20 bg-neutral-100 rounded">
      <div className="relative rounded p-4 grid">
        <h2 className="text-slate-700 mb-4 font-semibold text-xl">
          Add Habitica credentials
        </h2>
        <p className="text-slate-700 text-sm mb-4">
          To complete the registration process, please enter your{' '}
          <strong>Habitica User ID and API Token</strong>. These will be
          associated with your GitHub username.
        </p>
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
            className="p-2 bg-violet-600 rounded-full flex gap-4 items-center justify-center w-full text-lg text-white hover:bg-violet-800"
            disabled={loading}
          >
            Submit
          </FormSubmit>
        </Form>
      </div>
    </div>
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
