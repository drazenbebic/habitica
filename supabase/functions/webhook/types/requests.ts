import { ChecklistItem } from './models.ts';
import {
  TaskAttribute,
  TaskFrequency,
  TaskPriority,
  TaskType,
} from '../enums.ts';

export type CreateTaskParameters = {
  text: string;
  type: TaskType;
  tags?: string[];
  alias?: string;
  attribute?: TaskAttribute;
  checklist?: ChecklistItem[];
  collapseChecklist?: boolean;
  notes?: string;
  date?: Date;
  priority?: TaskPriority;
  reminders?: {
    id: string;
    startDate: string;
    time: string;
  }[];
  frequency?: TaskFrequency;
  repeat?:
    | true
    | {
        su?: boolean;
        m?: boolean;
        t?: boolean;
        w?: boolean;
        th?: boolean;
        f?: boolean;
        s?: boolean;
      };
  everyX?: number;
  streak?: number;
  daysOfMonth?: number[];
  weeksOfMonth?: number[];
  up?: boolean;
  down?: boolean;
  value?: number;
};
