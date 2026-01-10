import { App } from 'octokit';

const getPrivateKey = () => {
  const key = process.env.GITHUB_PRIVATE_KEY;
  if (!key) return '';

  try {
    return Buffer.from(key, 'base64').toString('utf-8');
  } catch {
    return key;
  }
};

const app = new App({
  appId: process.env.GITHUB_CLIENT_ID!,
  privateKey: getPrivateKey(),
});

export async function getInstallationOctokit(installationId: number) {
  return await app.getInstallationOctokit(installationId);
}
