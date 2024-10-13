import { UpdateTaskSchema } from "../../schemas/updateTaskSchema";

export type ActionsProps = {
  id: number;
  editTask: (id: number, newTitle: UpdateTaskSchema) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
};
