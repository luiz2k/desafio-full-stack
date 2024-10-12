"use client";

import { LabelWithInput } from "@/modules/shared/components/LabelWithInput/LabelWithInput";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signUpSchema, SignUpSchema } from "../schemas/signUpSchema";
import { signUp } from "../services/signUp";
import s from "./SignUp.module.css";

export function SignUp() {
  const [message, setMessage] = useState({
    message: "Preencha os dados para criar sua conta",
    color: "",
  });

  const router = useRouter();

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpSchema) => {
    try {
      await signUp(data);

      router.push("/signin?status=created");
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
          <h2>Registro</h2>
          <p style={{ color: message.color }}>{message.message}</p>
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

          <LabelWithInput
            label="Confirmação da senha"
            type="text"
            warning={form.formState.errors.confirmPassword?.message}
            {...form.register("confirmPassword")}
          />

          <div className={s.a_button}>
            <Link href="/signin">Entrar</Link>
            <button type="submit" className="button_style_1">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
