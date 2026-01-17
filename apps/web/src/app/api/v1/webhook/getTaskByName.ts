import HabiticaApi from '@/lib/HabiticaApi';
import { Task } from '@/types/habitica';

const getTaskByName = async (
  habiticaApi: HabiticaApi,
  taskName: string,
): Promise<Task | undefined> => {
  const tasks = await habiticaApi.getTasks();

  return tasks.find(task => task.text === taskName);
};

export default getTaskByName;
