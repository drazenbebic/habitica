import * as dotenv from 'dotenv';

// Loading the environment
dotenv.config({ path: '../../../.env' });

export const baseUrl = 'https://habitica.com/api/v3';

export * from './tasks';
export * from './types';
export * from './utils';
export * from './enums';
