import { SupabaseClient } from 'npm:@supabase/supabase-js@2';
import { User } from 'npm:@octokit/webhooks-types@7';
import { v4 } from 'npm:uuid@10';
import HttpError from '../http-error.ts';

export const toggleInstallation = async (
  {
    action,
    installationId,
    suspended,
  }: {
    action: 'suspend' | 'unsuspend';
    installationId: number;
    suspended: boolean;
  },
  supabase: SupabaseClient,
) => {
  console.info(`[INSTALLATION:${action.toUpperCase()}]: Event triggered.`);

  const { error } = await supabase
    .from('hbtc_github_installations')
    .update({ suspended })
    .eq('installation_id', installationId);

  if (error) {
    console.error('The GitHub Installation could not be toggled.', {
      installationId,
      suspended,
      error,
    });
  }
};

export const deleteInstallation = async () => {};

export const createInstallation = async (
  {
    installationId,
    sender,
  }: {
    installationId: number;
    sender: User;
  },
  supabase: SupabaseClient,
) => {
  console.info('[INSTALLATION.CREATED]: Event triggered.');
  // Check if the installation already exists.
  const { data: existingGitHubInstallation } = await supabase
    .from('hbtc_github_installations')
    .select('*')
    .eq('installation_id', Number(installationId))
    .single();

  if (existingGitHubInstallation) {
    console.error('EXISTING_GITHUB_INSTALLATION', { installationId });
    throw new HttpError('An installation with this ID already exists.', 409);
  }

  // Create the installation.
  const { data: gitHubInstallation, error: gitHubInstallationError } =
    await supabase
      .from('hbtc_github_installations')
      .insert({ uuid: v4(), installation_id: installationId })
      .select('*')
      .single();

  if (gitHubInstallationError) {
    console.error('GITHUB_INSTALLATION_ERROR', gitHubInstallationError);
    throw new HttpError('The installation could not be created.', 500);
  }

  const { error: gitHubUserError } = await supabase
    .from('hbtc_github_users')
    .insert({
      uuid: v4(),
      installation_uuid: gitHubInstallation.uuid,
      login: sender?.login,
      id: sender?.id,
      node_id: sender?.node_id,
      avatar_url: sender?.avatar_url,
      gravatar_id: sender?.gravatar_id,
      html_url: sender?.html_url,
      type: sender?.type,
      name: sender?.name,
      email: sender?.email,
    });

  if (gitHubUserError) {
    console.error('GITHUB_USER_ERROR', gitHubUserError);
    throw new HttpError('The GitHub User could not be created.', 500);
  }
};
