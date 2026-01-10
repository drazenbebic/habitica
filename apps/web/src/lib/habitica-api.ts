import { TaskDirection } from '@/enums/habitica';
import {
  APIResponse,
  ChecklistItem,
  CreateTaskParameters,
  ScoreTaskResponse,
  Task,
  UserStats,
} from '@/types/habitica';

const BASE_URL = 'https://habitica.com/api/v3';

class HabiticaApi {
  private readonly headers: HeadersInit;

  constructor(userId: string, apiToken: string) {
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-user': userId,
      'x-api-key': apiToken,
      'x-client': `${userId}-HabiticaSync`,
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      cache: 'no-store',
      ...options,
      headers: {
        ...this.headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Habitica API Error [${response.status}]: ${errorText || response.statusText}`,
      );
    }

    const json = (await response.json()) as APIResponse<T>;

    return json.data;
  }

  createTask = (payload: CreateTaskParameters): Promise<Task> => {
    return this.request<Task>('/tasks/user', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  };

  getTasks = (): Promise<Task[]> => {
    return this.request<Task[]>('/tasks/user', {
      method: 'GET',
    });
  };

  scoreTask = (
    taskId: string,
    direction: TaskDirection,
  ): Promise<ScoreTaskResponse> => {
    return this.request<ScoreTaskResponse>(
      `/tasks/${taskId}/score/${direction}`,
      {
        method: 'POST',
      },
    );
  };

  tagTask = (taskId: string, tagId: string): Promise<Task> => {
    return this.request<Task>(`/tasks/${taskId}/tags/${tagId}`, {
      method: 'POST',
    });
  };

  addChecklistItemToTask = (
    taskId: string,
    payload: ChecklistItem,
  ): Promise<Task> => {
    return this.request<Task>(`/tasks/${taskId}/checklist`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  };

  getUserStats = (options?: RequestInit): Promise<{ stats: UserStats }> => {
    return this.request<{ stats: UserStats }>('/user?userFields=stats', {
      method: 'GET',
      ...options,
    });
  };
}

export default HabiticaApi;
