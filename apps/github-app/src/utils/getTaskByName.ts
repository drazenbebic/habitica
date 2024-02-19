import { HabiticaApi, Task } from '@habitica/core';

const getTaskByName = async (
  habiticaApi: HabiticaApi,
  taskName: string,
): Promise<Task> => {
  const tasks = await habiticaApi.getTasks();
  return tasks.find(task => task.text === taskName);
};

export default getTaskByName;
