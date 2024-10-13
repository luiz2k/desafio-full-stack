import React from "react";
import s from "./Modal.module.css";
import { X } from "lucide-react";
import { ModalProps } from "./types";

// Modal reutilizado
export function Modal({ isOpen, onClose, title, desc, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={s.container}>
      <div className={s.modal}>
        <div className={s.header}>
          <h2>{title}</h2>
          <p>{desc}</p>
        </div>

        {children}

        <button type="button" className={s.close} onClick={onClose}>
          <X />
        </button>
      </div>
    </div>
  );
}
