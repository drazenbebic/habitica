import axios, { AxiosResponse } from 'axios';
import { ScoreTaskResponse, TaskDirection, baseUrl } from '../index';
import { CreateTaskParameters } from '../types';
import { APIResponse, CreateTaskResponse } from '../types';
import { getHeaders } from '../utils';

export const createTask = async (
  data: CreateTaskParameters,
): Promise<AxiosResponse<APIResponse<CreateTaskResponse>>> =>
  axios.post(`${baseUrl}/tasks/user`, data, {
    headers: getHeaders(),
  });

export const scoreTask = async (
  taskId: string,
  direction: TaskDirection,
): Promise<AxiosResponse<APIResponse<ScoreTaskResponse>>> =>
  axios.post(`${baseUrl}/tasks/${taskId}/score/${direction}`, undefined, {
    headers: getHeaders(),
  });
