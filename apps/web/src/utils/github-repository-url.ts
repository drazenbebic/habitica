export const githubRepositoryUrl = (path?: string) => {
  const baseUrl = 'https://github.com/drazenbebic/habitica';

  if (!path) {
    return baseUrl;
  }

  return `${baseUrl}${path}`;
};
