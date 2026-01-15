import { z } from 'zod';

export const triggerSchema = z.object({
  isActive: z.boolean().optional(),
  event: z.string().min(1, 'Please select a trigger event'),
  taskTitle: z.string().min(1, 'Task title is required').max(255),
  taskNote: z.string().optional(),
  scoreDirection: z.enum(['up', 'down']),
  taskPriority: z.coerce.number(),
  taskAttribute: z.enum(['str', 'int', 'con', 'per']),
  taskFrequency: z.enum(['DAILY', 'WEEKLY', 'MONTHLY']),
});

export type TriggerSchema = z.infer<typeof triggerSchema>;
