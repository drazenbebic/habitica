import catchAsyncErrors from './catch-async-errors.middleware';
import { HTTPError, prisma } from '../utils';
import { Installation } from '@octokit/webhooks-types';

const authMiddleware = catchAsyncErrors(async (request, response, next) => {
  const installation: Installation = request.body.installation as Installation;
  const githubInstallation = await prisma.gitHubInstallations.findFirst({
    where: {
      installationId: `${installation.id}`,
    },
    include: {
      habiticaUser: true,
    },
  });

  if (!githubInstallation || !githubInstallation.habiticaUser) {
    return next(new HTTPError('Installation not found.', 404));
  }

  const { userId, apiToken } = githubInstallation.habiticaUser;

  if (!userId || !apiToken) {
    return next(new HTTPError('Installation not found.', 404));
  }

  request.habitica = {
    userId,
    apiToken,
  };

  next();
});

export default authMiddleware;
