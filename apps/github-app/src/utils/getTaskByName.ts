import { Task, getTasks } from '@habitica/api';

const getTaskByName = async (taskName: string): Promise<Task> => {
  const tasks = await getTasks();
  return tasks.find(task => task.text === taskName);
};

export default getTaskByName;
