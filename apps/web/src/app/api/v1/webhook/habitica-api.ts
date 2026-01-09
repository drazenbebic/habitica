import axios from 'axios';
import { env } from 'process';

import { TaskDirection } from './enums';
import {
  APIResponse,
  ChecklistItem,
  CreateTaskParameters,
  ScoreTaskResponse,
  Task,
} from './types';

const habiticaUserId = env.HABITICA_USER_ID!;

class HabiticaApi {
  userId: string;
  apiToken: string;
  baseUrl: string;
  headers: {
    'x-api-user': string;
    'x-api-key': string;
    'x-client': string;
  };

  constructor(userId: string, apiToken: string) {
    this.userId = userId;
    this.apiToken = apiToken;
    this.baseUrl = 'https://habitica.com/api/v3';
    this.headers = {
      'x-api-user': userId,
      'x-api-key': apiToken,
      'x-client': `${habiticaUserId}-github-app`,
    };
  }

  createTask = async (payload: CreateTaskParameters): Promise<Task> => {
    const {
      data: { data },
    } = await axios.post<APIResponse<Task>>(
      `${this.baseUrl}/tasks/user`,
      payload,
      {
        headers: this.headers,
      },
    );

    return data;
  };

  getTasks = async (): Promise<Task[]> => {
    const {
      data: { data: tasks },
    } = await axios.get<APIResponse<Task[]>>(`${this.baseUrl}/tasks/user`, {
      headers: this.headers,
    });

    return tasks;
  };

  scoreTask = async (
    taskId: string,
    direction: TaskDirection,
  ): Promise<ScoreTaskResponse> => {
    const {
      data: { data },
    } = await axios.post<APIResponse<ScoreTaskResponse>>(
      `${this.baseUrl}/tasks/${taskId}/score/${direction}`,
      undefined,
      {
        headers: this.headers,
      },
    );

    return data;
  };

  tagTask = async (taskId: string, tagId: string): Promise<Task> => {
    const {
      data: { data },
    } = await axios.post<APIResponse<Task>>(
      `${this.baseUrl}/tasks/${taskId}/tags/${tagId}`,
      undefined,
      {
        headers: this.headers,
      },
    );

    return data;
  };

  addChecklistItemToTask = async (taskId: string, payload: ChecklistItem) => {
    const { data } = await axios.post(
      `${this.baseUrl}/tasks/${taskId}/checklist`,
      payload,
      {
        headers: this.headers,
      },
    );

    return data;
  };
}

export default HabiticaApi;
