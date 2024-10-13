import { forwardRef, useId } from "react";
import s from "./LabelWithInput.module.css";
import { InputProps } from "./types";

// Componente para renderizar label e input
export const LabelWithInput = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, warning, ...rest }, ref) => {
    const id = useId();

    return (
      <div className={s.input_label}>
        <label htmlFor={id}>{label}</label>
        <input {...rest} id={id} name={name} type={type} ref={ref} />
        {warning && <small className={s.small_warning}>{warning}</small>}
      </div>
    );
  },
);

LabelWithInput.displayName = "LabelWithInput";
