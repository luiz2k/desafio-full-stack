"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { UpdateTaskSchema } from "../schemas/updateTaskSchema";

const API_URL = process.env.API_URL;

export const deleteTask = async (id: number) => {
  const response = await fetch(`${API_URL}/task/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao deletar a tarefa");
  }

  const data = await response.json();

  revalidateTag("tasks");

  return data;
};

export const editTask = async (id: number, newTitle: UpdateTaskSchema) => {
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

  revalidateTag("tasks");

  return data;
};
