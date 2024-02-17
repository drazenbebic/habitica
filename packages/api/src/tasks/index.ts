import axios, { AxiosResponse } from 'axios';
import { ScoreTaskResponse, Task, TaskDirection, baseUrl } from '../index';
import { CreateTaskParameters } from '../types';
import { APIResponse } from '../types';
import { getHeaders } from '../utils';

export const createTask = async (
  data: CreateTaskParameters,
): Promise<AxiosResponse<APIResponse<Task>>> =>
  axios.post(`${baseUrl}/tasks/user`, data, {
    headers: getHeaders(),
  });

export const getTasks = async (): Promise<AxiosResponse<APIResponse<Task[]>>> =>
  axios.get(`${baseUrl}/tasks/user`, { headers: getHeaders() });

export const scoreTask = async (
  taskId: string,
  direction: TaskDirection,
): Promise<AxiosResponse<APIResponse<ScoreTaskResponse>>> =>
  axios.post(`${baseUrl}/tasks/${taskId}/score/${direction}`, undefined, {
    headers: getHeaders(),
  });
