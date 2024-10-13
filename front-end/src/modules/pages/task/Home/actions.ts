"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { UpdateTaskSchema } from "./schemas/updateTaskSchema";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL;

// Apaga uma tarefa
export const deleteTask = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
  });

  const data = await response.json();

  // Se o token expirou, envia para a rota de login
  if (response.status === 401 && data.message === "Não autorizado") {
    redirect(`/signin?status=expired`);
  }

  revalidateTag("tasks");
};

// Edita uma tarefa
export const editTask = async (
  id: number,
  newTitle: UpdateTaskSchema,
): Promise<void> => {
  const response = await fetch(`${API_URL}/task/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
    body: JSON.stringify(newTitle),
  });

  if (!response.ok) {
    throw new Error("Falha ao editar a tarefa");
  }

  const data = await response.json();

  // Se o token expirou, envia para a rota de login
  if (response.status === 401 && data.message === "Não autorizado") {
    redirect(`/signin?status=expired`);
  }

  revalidateTag("tasks");
};
