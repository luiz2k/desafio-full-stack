"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { CreateTaskSchema } from "./schemas/CreateTaskSchema";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL;

// Cria um nova tarefa
export const createTask = async (newTask: CreateTaskSchema) => {
  const response = await fetch(`${API_URL}/task`, {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
    cache: "no-store",
  });

  const data = await response.json();

  // Se o token expirou, envia para a rota de login
  if (response.status === 401 && data.message === "Não autorizado") {
    redirect(`/signin?status=expired`);
  }

  // Atualiza o cache de tarefas
  revalidateTag("tasks");

  return data;
};
