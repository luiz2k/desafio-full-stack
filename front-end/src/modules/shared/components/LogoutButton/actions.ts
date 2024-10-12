"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Desloga o usuário
export const signOut = () => {
  cookies().delete("session");

  redirect("/");
};
