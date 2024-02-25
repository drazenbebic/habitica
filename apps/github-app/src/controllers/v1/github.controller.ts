import catchAsyncErrors from '../../middlewares/catch-async-errors.middleware';
import { HTTPError, prisma } from '../../utils';
import { env } from 'process';
import EventHandler from '../../event-handler';
import axios from 'axios';

class GitHubController {
  webhook = catchAsyncErrors(async (request, response) => {
    const deliveryUuid = request.header('x-github-delivery');
    const event = request.header('x-github-event');
    const hookId = request.header('x-github-hook-id');
    const payload = request.body;

    const eventHandler = new EventHandler();

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
      await eventHandlers[event](payload);
    }

    response.status(200).json({
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
    const { code, installationId, userId, apiToken } = request.body;

    const githubInstallation = await prisma.gitHubInstallations.findFirst({
      where: {
        installationId: Number(installationId),
      },
    });

    if (!githubInstallation) {
      return next(
        new HTTPError('The GitHub installation could not be found.', 404),
      );
    }

    const { data: tokenData } = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: env.CLIENT_ID,
        client_secret: env.CLIENT_SECRET,
        code,
      },
    );

    const params = new URLSearchParams(tokenData);

    const { data: gitHubUserData } = await axios.get(
      'https://api.github.com/user',
      {
        headers: {
          accept: 'application/vnd.github+json',
          authorization: `Bearer ${params.get('access_token')}`,
          'x-github-api-version': '2022-11-28',
        },
      },
    );

    const gitHubUser = await prisma.gitHubUsers.findFirst({
      where: {
        login: gitHubUserData.login,
      },
    });

    if (!gitHubUser) {
      return next(new HTTPError('The GitHub user could not be found.', 404));
    }

    await prisma.gitHubUsers.update({
      where: {
        uuid: gitHubUser.uuid,
      },
      data: {
        name: gitHubUserData?.name || undefined,
        company: gitHubUserData?.company || undefined,
        blog: gitHubUserData?.blog || undefined,
        location: gitHubUserData?.location || undefined,
        email: gitHubUserData?.email || undefined,
        accessToken: params.get('access_token') || undefined,
        expiresIn: Number(params.get('expires_in')) || undefined,
        refreshToken: params.get('refresh_token') || undefined,
        refreshTokenExpiresIn:
          Number(params.get('refresh_token_expires_in')) || undefined,
        scope: params.get('scope') || undefined,
        tokenType: params.get('token_type') || undefined,
      },
    });

    const habiticaUser = await prisma.habiticaUsers.create({
      data: {
        gitHubUserUuid: gitHubUser.uuid,
        userId,
        apiToken,
      },
    });

    if (!habiticaUser) {
      return next(
        new HTTPError('The Habitica user could not be created.', 500),
      );
    }

    response.status(200).json({
      success: true,
      message: 'Habitica user added successfully.',
      data: habiticaUser,
    });
  });
}

export default GitHubController;
