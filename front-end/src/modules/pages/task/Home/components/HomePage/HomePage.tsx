import Link from "next/link";
import { getAllTasks } from "../../services/getAllTasks";
import { Actions } from "../Actions/Actions";
import s from "./HomePage.module.css";

export default async function Home() {
  const tasks = await getAllTasks();

  return (
    <section className={s.container}>
      <div className={s.header}>
        <h2>Gerencia suas tarefas</h2>

        <Link href="/create">Nova tarefa</Link>
      </div>

      <div className={s.tasks_container}>
        <h3>Tarefas</h3>

        {/* {tasks.data.map((task) => (
          <article key={task.id} className={s.task_container}>
            <p>{task.title}</p>

            <Actions id={task.id} />
          </article>
        ))} */}

        {tasks.data.length ? (
          <>
            {tasks.data.map((task) => (
              <article key={task.id} className={s.task_container}>
                <p>{task.title}</p>

                <Actions id={task.id} />
              </article>
            ))}
          </>
        ) : (
          <>
            <p className={s.no_tasks}>Nenhuma tarefa foi encontrada</p>
          </>
        )}
      </div>
    </section>
  );
}
