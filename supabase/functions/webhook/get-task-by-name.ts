import HabiticaApi from './habitica-api.ts';
import { Task } from './types/index.ts';

const getTaskByName = async (
  habiticaApi: HabiticaApi,
  taskName: string,
): Promise<Task> => {
  const tasks = await habiticaApi.getTasks();
  return tasks.find(task => task.text === taskName);
};

export default getTaskByName;
