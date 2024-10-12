"use client";

import { LogOut } from "lucide-react";
import { signOut } from "./actions";
import s from "./LogoutButton.module.css";

// Componente responsável por deslogar o usuário
export function LogoutButton() {
  const onClick = () => {
    signOut();
  };

  return (
    <button
      type="button"
      className={`button_style_1 ${s.button}`}
      onClick={onClick}
    >
      <LogOut />
    </button>
  );
}
