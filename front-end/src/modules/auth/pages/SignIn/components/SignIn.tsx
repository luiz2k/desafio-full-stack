"use client";

import { LabelWithInput } from "@/modules/shared/components/LabelWithInput/LabelWithInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInSchema, signInSchema } from "../schemas/signInSchema";
import { signIn } from "../services/signIn";
import s from "./SignIn.module.css";

export function SignIn() {
  const searchParams = useSearchParams();
  const params = searchParams.get("status") as "created" | "expired";

  // Possíveis status para o parâmetro da URL
  const statusMessages = {
    default: {
      message: "Digite seu email e senha para entrar",
      color: "",
    },
    created: {
      message: "Conta criada com sucesso",
      color: "green",
    },
    expired: {
      message: "Sua sessão expirou",
      color: "crimson",
    },
  };

  // Define o estado inicial de acordo com o parâmetro da URL
  const stateValue = statusMessages[params] || statusMessages.default;

  const [message, setMessage] = useState(stateValue);

  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInSchema) => {
    try {
      await signIn(data);

      router.push("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Ocorreu um erro inesperado.";

      setMessage({ message: errorMessage, color: "crimson" });
    }
  };

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.header}>
          <h2>Entrar</h2>

          <p className={s.small} style={{ color: message.color }}>
            {message.message}
          </p>
        </div>

        <form className={s.form} onSubmit={form.handleSubmit(onSubmit)}>
          <LabelWithInput
            label="E-mail"
            type="text"
            warning={form.formState.errors.email?.message}
            {...form.register("email")}
          />

          <LabelWithInput
            label="Senha"
            type="text"
            warning={form.formState.errors.password?.message}
            {...form.register("password")}
          />

          <div className={s.a_button}>
            <Link href="/signup">Registro</Link>
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </section>
  );
}
