import catchAsyncErrors from '../../middlewares/catch-async-errors.middleware';
import { HTTPError, prisma } from '../../utils';
import { env } from 'process';

class OAuthController {
  complete = catchAsyncErrors(async (request, response, next) => {
    const {
      code,
      installation_id: installationId,
      setup_action: setupAction,
    } = request.query;

    if (setupAction === 'install') {
      let githubInstallation = await prisma.gitHubInstallations.findFirst({
        where: {
          code: code.toString(),
        },
      });

      if (githubInstallation) {
        return next(
          new HTTPError('An installation with this ID already exists.', 409),
        );
      }

      githubInstallation = await prisma.gitHubInstallations.create({
        data: {
          code: code.toString(),
          installationId: Number(installationId),
        },
      });

      await prisma.habiticaUsers.create({
        data: {
          githubInstallationUuid: githubInstallation.uuid,
          // TODO: Retrieve these values from the request.
          userId: env.HABITICA_USER_ID,
          apiToken: env.HABITICA_API_TOKEN,
        },
      });

      response.status(githubInstallation ? 200 : 500).json({
        success: !!githubInstallation,
        message: githubInstallation
          ? 'Installation successful.'
          : 'Installation failed.',
        data: null,
      });
    } else {
      response.status(200).json({
        success: true,
        message: 'Installation successful.',
        data: null,
      });
    }
  });
}

export default OAuthController;
