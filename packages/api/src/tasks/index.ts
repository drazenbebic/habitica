import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../index';
import { CreateTaskParameters } from '../types';
import { APIResponse, CreateTaskResponse } from '../types';
import { getHeaders } from '../utils';

export const createTask = async (
  data: CreateTaskParameters,
): Promise<AxiosResponse<APIResponse<CreateTaskResponse>>> => {
  return axios.post(`${baseUrl}/tasks/user`, data, {
    headers: getHeaders(),
  });
};
