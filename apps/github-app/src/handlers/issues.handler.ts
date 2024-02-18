import { IssuesEvent } from '@octokit/webhooks-types';

const issuesHandler = async (
  deliveryUuid: string,
  hookId: string,
  event: IssuesEvent,
) => {
  console.log('🚧 TODO: issues handler.');
};

export default issuesHandler;
