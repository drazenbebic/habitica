import catchAsyncErrors from './catch-async-errors.middleware';
import { HTTPError, prisma } from '../utils';
import { Installation } from '@octokit/webhooks-types';

const authMiddleware = catchAsyncErrors(async (request, response, next) => {
  const installation: Installation = request.body.installation as Installation;
  const githubInstallation = await prisma.gitHubInstallations.findFirst({
    where: {
      installationId: installation.id,
    },
    include: {
      gitHubUsers: {
        include: {
          habiticaUser: true,
        },
      },
    },
  });

  if (!githubInstallation || githubInstallation.gitHubUsers.length < 0) {
    return next(new HTTPError('Installation not found.', 404));
  }

  if (githubInstallation.suspended) {
    return next(new HTTPError('Installation suspended.', 403));
  }

  next();
});

export default authMiddleware;
