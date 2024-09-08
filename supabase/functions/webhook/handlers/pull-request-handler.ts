import { PullRequestEvent } from 'npm:@octokit/webhooks-types@7';
import { SupabaseClient } from 'npm:@supabase/supabase-js@2';
import getHabiticaApi from '../get-habitica-api.ts';
import getTaskByName from '../get-task-by-name.ts';
import { TaskDirection, TaskPriority, TaskType } from '../enums.ts';

export const pullRequestHandler = async (
  {
    action,
    installation,
    pull_request: pullRequest,
    repository,
    sender,
  }: PullRequestEvent,
  supabase: SupabaseClient,
) => {
  const isFeature = pullRequest.title.startsWith('feat');
  const isBugFix = pullRequest.title.startsWith('fix');

  if (action !== 'closed' || (!isFeature && !isBugFix)) {
    return;
  }

  const habiticaApi = await getHabiticaApi(
    installation.id,
    sender.login,
    supabase,
  );

  if (!habiticaApi) {
    return;
  }

  const taskName = `Merged a ${isFeature ? 'feature' : 'bug fix'} branch in the "${repository.name}" repository`;
  const existingTask = await getTaskByName(habiticaApi, taskName);
  const task = existingTask
    ? existingTask
    : await habiticaApi.createTask({
        text: taskName,
        type: TaskType.HABIT,
        value: isFeature ? 5 : 3,
        priority: isFeature ? TaskPriority.HIGH : TaskPriority.NORMAL,
      });

  await habiticaApi.scoreTask(task.id, TaskDirection.UP);
};
