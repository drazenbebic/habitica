import HabiticaApi from './habitica-api.ts';
import { SupabaseClient } from 'npm:@supabase/supabase-js@2';

const getHabiticaApi = async (
  installationId: number,
  login: string,
  supabase: SupabaseClient,
): Promise<HabiticaApi | null> => {
  const { data: githubInstallation, error: githubInstallationError } =
    await supabase
      .from('hbtc_github_installations')
      .select('uuid')
      .eq('installation_id', Number(installationId))
      .single();

  if (githubInstallationError) {
    console.error('GITHUB_INSTALLATION_ERROR', githubInstallationError);
    return null;
  }

  const { data: gitHubUser, error: gitHubUserError } = await supabase
    .from('hbtc_github_users')
    .select('uuid')
    .eq('installation_uuid', githubInstallation.uuid)
    .eq('login', login)
    .single();

  if (gitHubUserError) {
    console.error('GITHUB_USER_ERROR', gitHubUserError);
    return null;
  }

  const { data: habiticaUser, error: habiticaUserError } = await supabase
    .from('hbtc_habitica_users')
    .select('user_id, api_token')
    .eq('github_user_uuid', gitHubUser.uuid)
    .single();

  if (habiticaUserError) {
    console.error('HABITICA_USER_ERROR', habiticaUserError);
    return null;
  }

  if (!habiticaUser?.user_id || !habiticaUser?.api_token) {
    console.error(
      'Habitica user is missing user_id or api_token',
      habiticaUser,
    );
  }

  return new HabiticaApi(habiticaUser.user_id, habiticaUser.api_token);
};

export default getHabiticaApi;
