import { UpdateTaskSchema } from "../../schemas/updateTaskSchema";
import { Tasks } from "../../services/types";

export type HomeProps = {
  getAllTasks: () => Promise<Tasks>;
  deleteTask: (id: number) => Promise<void>;
  editTask: (id: number, newTitle: UpdateTaskSchema) => Promise<void>;
};
