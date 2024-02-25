'use client';

import { NextPage } from 'next';
import React, { FC, Suspense, useState } from 'react';
import { Form, FormInput, FormSubmit, useFormStore } from '@ariakit/react';
import { Button, Pane, Paragraph, TextInputField } from 'evergreen-ui';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const Search: FC = () => {
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
    <Pane
      display="flex"
      flexDirection="column"
      padding={16}
      maxWidth={400}
      margin="auto"
      marginTop={100}
    >
      <Pane padding={16}></Pane>
      <Pane
        position="relative"
        borderRadius={3}
        borderColor="default"
        display="grid"
        background="tint2"
        padding={16}
        border
      >
        <Paragraph marginBottom={16}>
          To complete the registration process, please enter your{' '}
          <strong>Habitica User ID and API Token</strong>. These will be
          associated with your GitHub username.
        </Paragraph>
        <Form resetOnSubmit={false} store={form}>
          <FormInput
            required
            disabled={loading}
            name={form.names.userId}
            render={<TextInputField label="Habitica User ID" />}
          />
          <FormInput
            required
            disabled={loading}
            name={form.names.apiToken}
            render={
              <TextInputField label="Habitica API token" type="password" />
            }
          />
          <FormSubmit
            disabled={loading}
            render={
              <Button
                appearance="primary"
                type="submit"
                isLoading={loading}
                size="large"
                width="100%"
              >
                Submit
              </Button>
            }
          />
        </Form>
      </Pane>
    </Pane>
  );
};

const OAuth: NextPage = () => {
  return (
    <Suspense>
      <Search />
    </Suspense>
  );
};

export default OAuth;
