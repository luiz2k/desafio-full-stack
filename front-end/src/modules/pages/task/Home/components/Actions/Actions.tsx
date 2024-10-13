"use client";

import { Modal } from "@/modules/shared/components/Modal/Modal";
import { Pencil, Trash2 } from "lucide-react";
import s from "./Actions.module.css";
import { useState } from "react";
import { LabelWithInput } from "@/modules/shared/components/LabelWithInput/LabelWithInput";
import { useForm } from "react-hook-form";
import {
  updateTaskSchema,
  UpdateTaskSchema,
} from "../../schemas/updateTaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ActionsProps } from "./types";

// Ações possíveis para uma tarefa
export function Actions({ id, deleteTask, editTask }: ActionsProps) {
  const [deleteModal, setDeleteModal] = useState(false);

  // Apaga uma tarefa
  const onDelete = async () => {
    try {
      await deleteTask(id);

      setDeleteModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [editModal, setEditModal] = useState(false);

  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
  });

  // Edita uma tarefa
  const onEdit = async (data: UpdateTaskSchema) => {
    try {
      await editTask(id, data);

      setEditModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={s.actions}>
      <button
        type="button"
        aria-label="Editar tarefa"
        className={s.action}
        onClick={() => setEditModal(true)}
      >
        <Pencil size={16} />
      </button>

      <Modal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        title="Editando tarefa"
        desc="Informa o novo nome da tarefa"
      >
        <form className={s.form} onSubmit={form.handleSubmit(onEdit)}>
          <LabelWithInput
            label="Título"
            warning={form.formState.errors.title?.message}
            {...form.register("title")}
          />

          <button className="button_style_1">Editar</button>
        </form>
      </Modal>

      <button
        type="button"
        aria-label="Apagar tarefa"
        className={s.action}
        onClick={() => setDeleteModal(true)}
      >
        <Trash2 size={16} />
      </button>

      <Modal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        title="Apagando tarefa"
        desc="Você realmente quer apagar a tarefa?"
      >
        <button className="button_style_1" onClick={onDelete}>
          Apagar
        </button>
      </Modal>
    </div>
  );
}
