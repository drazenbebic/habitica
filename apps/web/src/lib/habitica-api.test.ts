import { TaskDirection, TaskType } from '@/enums/habitica';
import logger from '@/lib/logger';

import HabiticaApi from './habitica-api';

jest.mock('@/lib/logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

const mockFetch = jest.fn();

global.fetch = mockFetch;

describe('@/lib/habitica-api.ts', () => {
  const userId = 'user-123';
  const apiToken = 'token-abc';
  let api: HabiticaApi;

  beforeEach(() => {
    jest.clearAllMocks();
    api = new HabiticaApi(userId, apiToken);
  });

  const mockSuccessResponse = (data: unknown) => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, data }),
    });
  };

  const mockErrorResponse = (
    status: number,
    statusText: string,
    errorBody: string = '',
  ) => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status,
      statusText,
      text: async () => errorBody,
    });
  };

  describe('Constructor & Headers', () => {
    it('should include authentication headers in requests', async () => {
      mockSuccessResponse({});

      await api.getUserStats();

      const fetchOptions = mockFetch.mock.calls[0][1];

      expect(fetchOptions.headers).toEqual(
        expect.objectContaining({
          'x-api-user': userId,
          'x-api-key': apiToken,
          'x-client': `${userId}-Octogriffin`,
          'Content-Type': 'application/json',
        }),
      );
    });
  });

  describe('Error Handling', () => {
    it('should throw and log error when API returns non-200 status', async () => {
      mockErrorResponse(401, 'Unauthorized', 'Invalid credentials');

      await expect(api.getUserStats()).rejects.toThrow(
        'Habitica API Error [401]: Invalid credentials',
      );

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Habitica API Error [401]'),
      );
    });

    it('should fall back to statusText if response body is empty', async () => {
      mockErrorResponse(500, 'Internal Server Error');

      await expect(api.getUserStats()).rejects.toThrow(
        'Habitica API Error [500]: Internal Server Error',
      );
    });
  });

  describe('createTask', () => {
    it('should POST to /tasks/user with correct body', async () => {
      const taskData = { text: 'New Task', type: TaskType.HABIT };
      const expectedResponse = { id: 'task-1', text: 'New Task' };

      mockSuccessResponse(expectedResponse);

      const result = await api.createTask(taskData);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://habitica.com/api/v3/tasks/user',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(taskData),
        }),
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('scoreTask', () => {
    it('should POST to correct scoring endpoint', async () => {
      mockSuccessResponse({ delta: 10 });

      await api.scoreTask('task-123', TaskDirection.UP);

      expect(mockFetch).toHaveBeenCalledWith(
        `https://habitica.com/api/v3/tasks/task-123/score/${TaskDirection.UP}`,
        expect.objectContaining({ method: 'POST' }),
      );
    });
  });

  describe('getUserStats', () => {
    it('should merge custom options into the request', async () => {
      mockSuccessResponse({ stats: { lvl: 10 } });

      await api.getUserStats({ next: { revalidate: 60 } });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/user'),
        expect.objectContaining({
          method: 'GET',
          next: { revalidate: 60 },
        }),
      );
    });
  });
});
