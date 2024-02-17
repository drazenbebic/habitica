import express from 'express';
import WebhookController from '../../controllers/v1/webhook.controller';

const webhookRouter = express.Router();
const controller = new WebhookController();

webhookRouter.route('/webhooks/process').post(controller.process);

export default webhookRouter;
