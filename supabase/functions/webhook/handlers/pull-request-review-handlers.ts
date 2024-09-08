import { PullRequestReviewSubmittedEvent } from 'npm:@octokit/webhooks-types@7';
import { SupabaseClient } from 'npm:@supabase/supabase-js@2';
import getHabiticaApi from '../get-habitica-api.ts';
import { TaskDirection, TaskPriority, TaskType } from '../enums.ts';

export const pullRequestReviewSubmittedHandler = async (
  { installation, repository, sender }: PullRequestReviewSubmittedEvent,
  supabase: SupabaseClient,
) => {
  console.log('[pull_request_review.submitted]: Event triggered.');

  if (!installation?.id) {
    console.info('[pull_request_review.submitted]: Installation is missing.');
    return;
  }

  const habiticaApi = await getHabiticaApi(
    installation.id,
    sender.login,
    supabase,
  );

  if (!habiticaApi) {
    console.info('[pull_request_review.submitted]: Habitca user is missing.');
    return;
  }

  const taskName = `Review pull requests in the "${repository.name}" repository`;
  const tasks = await habiticaApi.getTasks();
  const existingTask = tasks.find(({ text }) => text === taskName);
  const task = existingTask
    ? existingTask
    : await habiticaApi.createTask({
        text: taskName,
        type: TaskType.HABIT,
        value: 3,
        priority: TaskPriority.HIGH,
      });

  await habiticaApi.scoreTask(task.id, TaskDirection.UP);
};
