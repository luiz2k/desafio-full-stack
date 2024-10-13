"use server";

import { SignUpSchema } from "./schemas/signUpSchema";
import { SignUp } from "./types";

const API_URL = process.env.API_URL;

// Faz a criação de um novo usuário
export const signUp = async (newUser: SignUpSchema): Promise<SignUp> => {
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const data = await response.json();

  // Se a solicitação não for bem sucedida, retorna um erro
  if (!response.ok) {
    return {
      error: true,
      message: data.message,
    };
  }

  return data;
};
