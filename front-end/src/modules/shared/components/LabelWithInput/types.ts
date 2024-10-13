import { InputHTMLAttributes } from "react";

export type InputProps = {
  label: string;
  warning?: string;
} & InputHTMLAttributes<HTMLInputElement>;
