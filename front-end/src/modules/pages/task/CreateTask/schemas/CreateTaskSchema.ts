import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, { message: "O título deve ser informado" }).max(25),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
