import axios from 'axios';
import {
  APIResponse,
  ChecklistItem,
  ScoreTaskResponse,
  Task,
  TaskDirection,
  baseUrl,
} from '../index';
import { CreateTaskParameters } from '../types';
import { getHeaders } from '../utils';

export const createTask = async (
  payload: CreateTaskParameters,
): Promise<Task> => {
  const {
    data: { data },
  } = await axios.post<APIResponse<Task>>(`${baseUrl}/tasks/user`, payload, {
    headers: getHeaders(),
  });

  return data;
};

export const getTasks = async (): Promise<Task[]> => {
  const {
    data: { data: tasks },
  } = await axios.get<APIResponse<Task[]>>(`${baseUrl}/tasks/user`, {
    headers: getHeaders(),
  });

  return tasks;
};

export const scoreTask = async (
  taskId: string,
  direction: TaskDirection,
): Promise<ScoreTaskResponse> => {
  const {
    data: { data },
  } = await axios.post<APIResponse<ScoreTaskResponse>>(
    `${baseUrl}/tasks/${taskId}/score/${direction}`,
    undefined,
    {
      headers: getHeaders(),
    },
  );

  return data;
};

export const tagTask = async (taskId: string, tagId: string): Promise<Task> => {
  const {
    data: { data },
  } = await axios.post<APIResponse<Task>>(
    `${baseUrl}/tasks/${taskId}/tags/${tagId}`,
    undefined,
    {
      headers: getHeaders(),
    },
  );

  return data;
};

export const addChecklistItemToTask = async (
  taskId: string,
  payload: ChecklistItem,
) => {
  const { data } = await axios.post(
    `${baseUrl}/tasks/${taskId}/checklist`,
    payload,
    {
      headers: getHeaders(),
    },
  );

  return data;
};
