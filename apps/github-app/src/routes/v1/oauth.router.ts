import express from 'express';
import OAuthController from '../../controllers/v1/oauth.controller';

const webhookRouter = express.Router();
const controller = new OAuthController();

webhookRouter.route('/oauth/complete').get(controller.complete);

export default webhookRouter;
