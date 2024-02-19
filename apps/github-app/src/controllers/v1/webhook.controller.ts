import catchAsyncErrors from '../../middlewares/catch-async-errors.middleware';

import { HabiticaApi } from '@habitica/core';
import EventHandler from '../../event-handler';

class WebhookController {
  process = catchAsyncErrors(async (request, response) => {
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
}

export default WebhookController;
