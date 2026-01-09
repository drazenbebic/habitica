import { TaskAttribute, TaskPriority, TaskType } from '../enums';

export type ChecklistItem = {
  text: string;
  completed?: boolean;
};

export type Task = {
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
  id: string;
};
