"use server";

import { cookies } from "next/headers";
import { SignInSchema } from "./schemas/signInSchema";
import { SignIn } from "./types";

const API_URL = process.env.API_URL;

// Faz o login do usuário
export const signIn = async (newUser: SignInSchema): Promise<SignIn> => {
  const response = await fetch(`${API_URL}/auth/sign-in`, {
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

  // Define o cookie de sessão
  cookies().set("session", data.data.accessToken);

  return data;
};
