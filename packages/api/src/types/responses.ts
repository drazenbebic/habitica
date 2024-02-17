import { TaskAttribute, TaskPriority, TaskType } from '../enums';
import { ChecklistItem } from './models';

export type APIResponse<M> = {
  success: boolean;
  data: M;
  notifications: string[];
};

export type CreateTaskResponse = {
  userId: string;
  alias: string;
  text: string;
  type: TaskType;
  notes: string;
  tags: string[];
  value: number;
  priority: TaskPriority;
  attribute: TaskAttribute;
  challenge: {
    id: string;
  };
  group: {
    assignedUsers: string[];
    approval: {
      required: boolean;
      approved: boolean;
      requested: boolean;
    };
  };
  reminders: string[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  checklist: ChecklistItem[];
  collapsedChecklist: boolean;
  completed: boolean;
  id: number;
};
