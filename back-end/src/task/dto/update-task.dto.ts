import { z } from 'zod';

export const updateTaskSchema = z.object({
  title: z.string().min(1, { message: 'O título deve ser informado' }).max(25),
});

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
