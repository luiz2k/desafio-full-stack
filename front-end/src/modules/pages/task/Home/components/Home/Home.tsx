"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Actions } from "../Actions/Actions";
import s from "./Home.module.css";
import { HomeProps } from "./types";
import { Tasks } from "../../services/types";

export function Home({ getAllTasks, deleteTask, editTask }: HomeProps) {
  const [tasks, setTasks] = useState<Tasks>({ message: "", data: [] });

  useEffect(() => {
    (async () => {
      const tasks = await getAllTasks();

      setTasks(tasks);
    })();
  }, [getAllTasks]);

  return (
    <section className={s.container}>
      <div className={s.header}>
        <h2>Gerencia suas tarefas</h2>

        <Link href="/create">Nova tarefa</Link>
      </div>

      <div className={s.tasks_container}>
        <h3>Tarefas</h3>

        {tasks?.data.length ? (
          <>
            {tasks.data.map((task) => (
              <article key={task.id} className={s.task_container}>
                <p>{task.title}</p>

                <Actions
                  id={task.id}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
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
