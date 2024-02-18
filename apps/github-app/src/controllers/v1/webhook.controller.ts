import catchAsyncErrors from '../../middlewares/catch-async-errors.middleware';
import {
  issueCommentHandler,
  issuesHandler,
  pullRequestHandler,
  pullRequestReviewHandler,
  pushHandler,
  registryPackageHandler,
} from '../../handlers';

class WebhookController {
  process = catchAsyncErrors(async (request, response) => {
    const deliveryUuid = request.header('x-github-delivery');
    const event = request.header('x-github-event');
    const hookId = request.header('x-github-hook-id');
    const payload = request.body;

    const eventHandlers = {
      issue_comment: issueCommentHandler,
      issues: issuesHandler,
      pull_request: pullRequestHandler,
      pull_request_review: pullRequestReviewHandler,
      push: pushHandler,
      registry_package: registryPackageHandler,
    };

    if (Object.prototype.hasOwnProperty.call(eventHandlers, event)) {
      eventHandlers[event](deliveryUuid, hookId, payload);
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
