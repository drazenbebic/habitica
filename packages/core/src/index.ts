import * as dotenv from 'dotenv';

// Loading the environment
dotenv.config({ path: '../../../.env' });

export { default as HabiticaApi } from './habitica-api';
export * from './types';
export * from './enums';
