"use client";

import { LabelWithInput } from "@/modules/shared/components/LabelWithInput/LabelWithInput";
import s from "./CreateTask.module.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  createTaskSchema,
  CreateTaskSchema,
} from "../../schemas/CreateTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createTask } from "../../actions";

// Componente para criar uma nova tarefa
export default function CreateTask() {
  const router = useRouter();

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
  });

  const onSubmit = async (data: CreateTaskSchema) => {
    await createTask(data);

    router.push("/");
  };

  return (
    <section className={s.container}>
      <div className={s.header}>
        <h2>Nova tarefa</h2>
        <p>Inform o nome da tarefa que deseja criar</p>
      </div>

      <form className={s.form} onSubmit={form.handleSubmit(onSubmit)}>
        <LabelWithInput
          label="Título"
          type="text"
          warning={form.formState.errors.title?.message}
          {...form.register("title")}
        />

        <div className={s.a_button}>
          <Link href="/">Voltar</Link>
          <button className={`button_style_1 ${s.button}`}>Criar</button>
        </div>
      </form>
    </section>
  );
}
