import catchAsyncErrors from '../../middlewares/catch-async-errors.middleware';
import { HTTPError, prisma } from '../../utils';
import { env } from 'process';
import { HabiticaApi } from '@habitica/core';
import EventHandler from '../../event-handler';
import axios from 'axios';

class GitHubController {
  webhook = catchAsyncErrors(async (request, response) => {
    const deliveryUuid = request.header('x-github-delivery');
    const event = request.header('x-github-event');
    const hookId = request.header('x-github-hook-id');
    const payload = request.body;

    const habiticaApi = new HabiticaApi(
      env.HABITICA_USER_ID,
      env.HABITICA_API_TOKEN,
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
      let gitHubInstallation = await prisma.gitHubInstallations.findFirst({
        where: {
          code: code.toString(),
        },
      });

      if (gitHubInstallation) {
        return next(
          new HTTPError('An installation with this ID already exists.', 409),
        );
      }

      const { data } = await axios.post(
        'https://github.com/login/oauth/access_token',
        {
          client_id: env.CLIENT_ID,
          client_secret: env.CLIENT_SECRET,
          code,
        },
      );

      const params = new URLSearchParams(data);

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

      gitHubInstallation = await prisma.gitHubInstallations.create({
        data: {
          code: code.toString(),
          installationId: Number(installationId),
        },
      });

      const gitHubUser = await prisma.gitHubUsers.create({
        data: {
          installationUuid: gitHubInstallation.uuid,
          login: gitHubUserData.login || undefined,
          id: gitHubUserData.id || undefined,
          nodeId: gitHubUserData.nodeId || undefined,
          avatarUrl: gitHubUserData.avatarUrl || undefined,
          gravatarId: gitHubUserData.gravatarId || undefined,
          htmlUrl: gitHubUserData.htmlUrl || undefined,
          type: gitHubUserData.type || undefined,
          name: gitHubUserData.name || undefined,
          company: gitHubUserData.company || undefined,
          blog: gitHubUserData.blog || undefined,
          location: gitHubUserData.location || undefined,
          email: gitHubUserData.email || undefined,
          accessToken: gitHubUserData.accessToken || undefined,
          expiresIn: gitHubUserData.expiresIn || undefined,
          refreshToken: gitHubUserData.refreshToken || undefined,
          refreshTokenExpiresIn:
            gitHubUserData.refreshTokenExpiresIn || undefined,
          scope: gitHubUserData.scope || undefined,
          tokenType: gitHubUserData.tokenType || undefined,
        },
      });

      await prisma.habiticaUsers.create({
        data: {
          gitHubUserUuid: gitHubUser.uuid,
          // TODO: Retrieve these values from the request.
          userId: env.HABITICA_USER_ID,
          apiToken: env.HABITICA_API_TOKEN,
        },
      });

      response.status(gitHubInstallation ? 200 : 500).json({
        success: !!gitHubInstallation,
        message: gitHubInstallation
          ? 'Installation successful.'
          : 'Installation failed.',
        data: null,
      });
    } else {
      response.status(200).json({
        success: true,
        message: 'Installation successful.',
        data: request.headers,
      });
    }
  });
}

export default GitHubController;
