import { IssueCommentEvent } from '@octokit/webhooks-types';

const issueCommentHandler = async (
  deliveryUuid: string,
  hookId: string,
  event: IssueCommentEvent,
) => {
  console.log('🚧 TODO: issue_comment handler.');
};

export default issueCommentHandler;
