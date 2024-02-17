import axios, { AxiosResponse } from 'axios';
import {
  ChecklistItem,
  ScoreTaskResponse,
  Task,
  TaskDirection,
  baseUrl,
} from '../index';
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

export const tagTask = async (
  taskId: string,
  tagId: string,
): Promise<AxiosResponse<APIResponse<Task>>> =>
  axios.post(`${baseUrl}/tasks/${taskId}/tags/${tagId}`, undefined, {
    headers: getHeaders(),
  });

export const addChecklistItemToTask = async (
  taskId: string,
  data: ChecklistItem,
) =>
  axios.post(`${baseUrl}/tasks/${taskId}/checklist`, data, {
    headers: getHeaders(),
  });
