import catchAsyncErrors from '../../middlewares/catch-async-errors.middleware';
import { HTTPError, prisma } from '../../utils';
import { env } from 'process';
import { HabiticaApi } from '@habitica/core';
import EventHandler from '../../event-handler';

class GitHubController {
  webhook = catchAsyncErrors(async (request, response) => {
    const deliveryUuid = request.header('x-github-delivery');
    const event = request.header('x-github-event');
    const hookId = request.header('x-github-hook-id');
    const payload = request.body;

    const habiticaApi = new HabiticaApi(
      request.habitica.userId,
      request.habitica.apiToken,
    );

    const eventHandler = new EventHandler(habiticaApi);

    const eventHandlers = {
      installation: eventHandler.installation,
      issue_comment: eventHandler.issueComment,
      issues: eventHandler.issues,
      pull_request: eventHandler.pullRequest,
      pull_request_review: eventHandler.pullRequestReview,
      push: eventHandler.push,
      registry_package: eventHandler.registryPackage,
      workflow_job: eventHandler.workflowJob,
      workflow_run: eventHandler.workflowRun,
    };

    if (Object.prototype.hasOwnProperty.call(eventHandlers, event)) {
      eventHandlers[event](payload);
    }

    response.status(202).json({
      success: true,
      message: 'Accepted. Webhook is being processed.',
      data: {
        deliveryUuid,
        event,
        hookId,
      },
    });
  });

  oAuthComplete = catchAsyncErrors(async (request, response, next) => {
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

export default GitHubController;
