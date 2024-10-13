import { deleteTask, editTask } from "./actions";
import { Home } from "./components/Home/Home";
import { getAllTasks } from "./services/getAllTasks";

export async function HomePage() {
  return (
    <>
      <Home
        getAllTasks={getAllTasks}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </>
  );
}
