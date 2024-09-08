import { SupabaseClient } from 'npm:@supabase/supabase-js@2';
import { InstallationEvent } from 'npm:@octokit/webhooks-types@7';
import { v4 } from 'npm:uuid@10';
import HttpError from '../http-error.ts';

export const installationToggleHandler = async (
  { action, installation }: InstallationEvent,
  suspended: boolean,
  supabase: SupabaseClient,
) => {
  console.info(`[INSTALLATION:${action.toUpperCase()}]: Event triggered.`);

  const { error } = await supabase
    .from('hbtc_github_installations')
    .update({ suspended })
    .eq('installation_id', installation.id);

  if (error) {
    console.error('The GitHub Installation could not be toggled.', {
      installation,
      suspended,
      error,
    });
  }
};

export const installationDeleteHandler = async (
  { installation }: InstallationEvent,
  supabase: SupabaseClient,
) => {
  console.info('[installation.deleted]: Event triggered.');

  const { data: gitHubInstallation, error: gitHubInstallationError } =
    await supabase
      .from('hbtc_github_installations')
      .select('uuid')
      .eq('installation_id', Number(installation.id))
      .single();

  if (gitHubInstallationError) {
    console.error('GITHUB_INSTALLATION_ERROR', gitHubInstallationError);
    throw new HttpError('The installation could not be created.', 500);
  }

  const { data: gitHubUsers, error: gitHubUsersError } = await supabase
    .from('hbtc_github_users')
    .select('*')
    .eq('installation_uuid', gitHubInstallation.uuid);

  if (gitHubUsersError) {
    console.error('GITHUB_USERS_ERROR', gitHubUsersError);
    throw new HttpError(
      'The users for the installation could not be fetched.',
      500,
    );
  }

  if (gitHubUsers.length > 0) {
    const { error: habiticaUsersError } = await supabase
      .from('hbtc_habitica_users')
      .delete()
      .in(
        'github_user_uuid',
        gitHubUsers.map(({ uuid }: { uuid: string }) => uuid),
      );

    if (habiticaUsersError) {
      console.error('HABITICA_USERS_ERROR', habiticaUsersError);
      throw new HttpError('The Habitica users could not be deleted.', 500);
    }

    const { error: gitHubUsersError } = await supabase
      .from('hbtc_github_users')
      .delete()
      .eq('installation_uuid', gitHubInstallation.uuid);

    if (gitHubUsersError) {
      console.error('GITHUB_USERS_ERROR', gitHubUsersError);
      throw new HttpError(
        'The users for the installation could not be deleted.',
        500,
      );
    }
  }

  const { error } = await supabase
    .from('hbtc_github_installations')
    .delete()
    .eq('uuid', gitHubInstallation.uuid);

  if (error) {
    console.error('GITHUB_INSTALLATION_ERROR', error);
    throw new HttpError('The GitHub Installation could not be deleted.', 500);
  }
};

export const installationCreateHandler = async (
  { installation, sender }: InstallationEvent,
  supabase: SupabaseClient,
) => {
  console.info('[installation.created]: Event triggered.');

  // Check if the installation already exists.
  const { data: existingGitHubInstallation } = await supabase
    .from('hbtc_github_installations')
    .select('uuid')
    .eq('installation_id', Number(installation.id))
    .single();

  if (existingGitHubInstallation) {
    console.error('EXISTING_GITHUB_INSTALLATION', {
      installationId: installation.id,
    });
    throw new HttpError('An installation with this ID already exists.', 409);
  }

  // Create the installation.
  const { data: gitHubInstallation, error: gitHubInstallationError } =
    await supabase
      .from('hbtc_github_installations')
      .insert({ uuid: v4(), installation_id: installation.id })
      .select('uuid')
      .single();

  if (gitHubInstallationError) {
    console.error('GITHUB_INSTALLATION_ERROR', gitHubInstallationError);
    throw new HttpError('The installation could not be created.', 500);
  }

  // Add the GitHub user.
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
