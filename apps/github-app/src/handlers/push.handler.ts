import { PushEvent } from '@octokit/webhooks-types';
import { TaskType, createTask } from '@habitica/api';

const pushHandler = async (
  deliveryUuid: string,
  hookId: string,
  payload: PushEvent,
) => {
  const { commits, repository } = payload;

  createTask({
    text: `Pushed ${commits.length} commit(s) in ${repository.name}`,
    type: TaskType.TODO,
    value: payload.commits.length,
  })
    .then(data => {
      console.log('data:', data);
    })
    .catch(error => {
      console.error('error:', error);
    });
};

export default pushHandler;
