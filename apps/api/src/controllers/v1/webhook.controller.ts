import catchAsyncErrors from '../../middlewares/catch-async-errors.middleware';

class WebhookController {
  process = catchAsyncErrors(async (request, response, next) => {
    const deliveryUuid = request.header('X-GitHub-Delivery');
    const event = request.header('X-GitHub-Event');
    const hookId = request.header('X-GitHub-Hook-ID');
    const payload = request.body;

    response.status(200).json({
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
