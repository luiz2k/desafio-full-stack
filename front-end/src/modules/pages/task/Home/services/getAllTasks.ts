import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL;

type Tasks = {
  message: string;
  data: {
    id: number;
    title: string;
    userId: number;
  }[];
};

export const getAllTasks = async (): Promise<Tasks> => {
  const response = await fetch(`${API_URL}/task`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies().get("session")?.value}`,
    },
    next: { tags: ["tasks"], revalidate: 3600 },
  });

  const data = await response.json();

  // Se o token expirou, envia para a rota de login
  if (response.status === 401 && data.message === "Não autorizado") {
    redirect(`/signin?status=expired`);
  }

  return data;
};
