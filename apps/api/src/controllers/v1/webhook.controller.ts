import catchAsyncErrors from '../../middlewares/catch-async-errors.middleware';

class WebhookController {
  process = catchAsyncErrors(async (request, response, next) => {
    const data = request.body;

    response.status(200).json({
      success: true,
      message: 'Webhook processed successfully.',
      data,
    });
  });
}

export default WebhookController;
