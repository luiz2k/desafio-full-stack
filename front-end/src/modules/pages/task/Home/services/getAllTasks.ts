import { cookies } from "next/headers";

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

  return data;
};
