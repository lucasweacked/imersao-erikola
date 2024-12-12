import { useState } from "react";

import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Array<Omit<TaskProps, "setDone">>>([]);
  const [error, setError] = useState("");

  function Validacao() {
    if (text.trim() === "") {
      setError("Por favor, inserir algo.");
      return;
    } else {
      setError("");
    }

    setTasks((arrayAntigo) => [...arrayAntigo, { text: text, done: false }]);
    setText("");
  }

  return (
    <>
      <div>
        <input
          type="text"
          name="tarefa"
          id="task"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Insira algo aqui"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              Validacao();
            }
          }}
        />
        <button
          onClick={() => {
            Validacao();
          }}
        >
          Salvar
        </button>
        <div>
          <span className="error">{error !== "" ? error : null}</span>
        </div>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <Task
            {...task}
            setDone={(done) =>
              setTasks((arrayAntigo) => {
                const arrayNovo = [...arrayAntigo];
                arrayNovo[index].done = done;
                return arrayNovo;
              })
            }
          />
        ))}
      </ul>
    </>
  );
}

type TaskProps = {
  text: string;
  done: boolean;
  setDone: (done: boolean) => void;
};

function Task(props: TaskProps) {
  return (
    <li>
      <input
        type="checkbox"
        name="done"
        readOnly={true}
        checked={props.done}
        onChange={(event) => props.setDone(event.target.checked)}
      />
      <span>{props.text}</span>
    </li>
  );
}
