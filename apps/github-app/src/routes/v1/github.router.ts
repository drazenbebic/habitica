import express from 'express';
import GitHubController from '../../controllers/v1/github.controller';
import webhookAuthMiddleware from '../../middlewares/webhook-auth.middleware';
import authMiddleware from '../../middlewares/auth.middleware';

const gitHubRouter = express.Router();
const controller = new GitHubController();

gitHubRouter.route('/github/oauth/complete').get(controller.oAuthComplete);
gitHubRouter
  .route('/github/webhook')
  .post(webhookAuthMiddleware, authMiddleware, controller.webhook);

export default gitHubRouter;
