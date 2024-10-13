import { render } from "@testing-library/react";
import { LabelWithInput } from "./LabelWithInput";

describe("LabelWithInput", () => {
  it("Deve renderizar o Input", async () => {
    const { findByText } = render(
      <LabelWithInput label="Teste de componente" />,
    );

    expect(await findByText("Teste de componente")).toBeInTheDocument();
  });

  it("Deve aparecer a mensagem de alerta", async () => {
    const { findByText } = render(
      <LabelWithInput label="Teste de componente" warning="Teste de alerta" />,
    );

    expect(await findByText("Teste de alerta")).toBeInTheDocument();
  });
});
