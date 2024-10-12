import { BookCheck } from "lucide-react";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import s from "./Header.module.css";

export function Header() {
  return (
    <header className={s.header}>
      <BookCheck />

      <LogoutButton />
    </header>
  );
}
