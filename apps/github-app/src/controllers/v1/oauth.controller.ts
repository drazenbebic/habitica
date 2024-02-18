import catchAsyncErrors from '../../middlewares/catch-async-errors.middleware';

class OAuthController {
  complete = catchAsyncErrors(async (request, response, next) => {
    const {
      code,
      installation_id: installationId,
      setup_action: setupAction,
    } = request.query;

    response.status(200).json({
      success: true,
      message: 'Installation successful',
      data: {
        code,
        installationId,
        setupAction,
        headers: request.headers,
      },
    });
  });
}

export default OAuthController;
