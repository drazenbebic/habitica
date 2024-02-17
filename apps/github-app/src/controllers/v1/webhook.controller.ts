import catchAsyncErrors from '../../middlewares/catch-async-errors.middleware';
import {
  pullRequestReviewHandler,
  pushHandler,
  registryPackageHandler,
} from '../../handlers';

class WebhookController {
  process = catchAsyncErrors(async (request, response, next) => {
    const deliveryUuid = request.header('X-GitHub-Delivery');
    const event = request.header('X-GitHub-Event');
    const hookId = request.header('X-GitHub-Hook-ID');
    const payload = request.body;

    const eventHandlers = {
      push: pushHandler,
      registry_package: registryPackageHandler,
      pull_request_review: pullRequestReviewHandler,
    };

    if (Object.prototype.hasOwnProperty.call(eventHandlers, event)) {
      eventHandlers[event](deliveryUuid, hookId, payload);
    }

    response.status(202).json({
      success: true,
      message: 'Webhook processed successfully.',
      data: {
        deliveryUuid,
        event,
        hookId,
        payload,
      },
    });
  });
}

export default WebhookController;
