import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { act } from "react";
import { Home } from "./Home";

const getAllTasks = async () => {
  return {
    message: "Tarefas encontradas",
    data: [
      { id: 10, title: "Tarefa 01", userId: 1 },
      { id: 11, title: "Tarefa 02", userId: 1 },
    ],
  };
};

const deleteTask = jest.fn();

describe("Home", () => {
  it("Deve renderizar", async () => {
    const { findByText } = render(
      <Home
        getAllTasks={getAllTasks}
        deleteTask={deleteTask}
        editTask={async () => {}}
      />,
    );

    expect(await findByText("Tarefa 01")).toBeInTheDocument();
    expect(await findByText("Tarefa 02")).toBeInTheDocument();
  });

  it("Deve apagar uma tarefa", async () => {
    const { findAllByRole, findByRole } = render(
      <Home
        getAllTasks={getAllTasks}
        deleteTask={deleteTask}
        editTask={async () => {}}
      />,
    );

    const deleteButtons = await findAllByRole("button", {
      name: "Apagar tarefa",
    });

    await act(async () => {
      fireEvent.click(deleteButtons[0]);
    });

    const confirmButton = await findByRole("button", {
      name: "Apagar",
    });

    await act(async () => {
      fireEvent.click(confirmButton);
    });

    expect(deleteTask).toHaveBeenCalled();
  });
});
