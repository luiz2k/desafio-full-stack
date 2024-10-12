import { z } from "zod";

// Esquema para validar a criação de usuário
export const signUpSchema = z
  .object({
    email: z.string().email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z.string().min(6, {
      message: "A confirmação da senha deve ter no mínimo 6 caracteres",
    }),
  })
  // Garante que `password` e `confirmPassword` sejam iguais
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
