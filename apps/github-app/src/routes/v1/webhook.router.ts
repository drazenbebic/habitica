import express from 'express';
import WebhookController from '../../controllers/v1/webhook.controller';
import webhookAuthMiddleware from '../../middlewares/webhook-auth.middleware';

const webhookRouter = express.Router();
const controller = new WebhookController();

webhookRouter
  .route('/webhooks/process')
  .post(webhookAuthMiddleware, controller.process);

export default webhookRouter;
