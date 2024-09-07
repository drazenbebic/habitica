import { SupabaseClient } from 'npm:@supabase/supabase-js@2';
import { User } from 'npm:@octokit/webhooks-types@7';
import { v4 } from 'npm:uuid@10';
import HttpError from '../http-error.ts';

export const suspendInstallation = async () => {};

export const unsuspendInstallation = async () => {};

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
  // Check if the installation already exists.
  const { data: existingGitHubInstallation } = await supabase
    .from('hbtc_github_installations')
    .select('*')
    .eq('installation_id', Number(installationId))
    .single();

  if (existingGitHubInstallation) {
    console.error('Habitica - Installation already exists.', installationId);
    throw new HttpError('An installation with this ID already exists.', 409);
  }

  // Create the installation.
  const { error: gitHubInstallationError } = await supabase
    .from('hbtc_github_installations')
    .insert({ uuid: v4(), installation_id: installationId });

  if (gitHubInstallationError) {
    console.error(
      'Habitica - The installation could not be created.',
      gitHubInstallationError,
    );
    throw new HttpError('The installation could not be created.', 500);
  }

  // Re-fetch the installation from the database.
  const { data: gitHubInstallation } = await supabase
    .from('hbtc_github_installations')
    .select('*')
    .eq('installation_id', Number(installationId))
    .single();

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
    console.error('Habitica - The GitHub User could not be created.', {
      installationId,
      user: sender,
    });
    throw new HttpError('The GitHub User could not be created.', 500);
  }
};
