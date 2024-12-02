import { useState } from 'react';

import './App.css'

export default function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);
  const [error, setError] = useState("");

  return (
  <>
  <div>
    <input type="text" name="tarefa" id="task" value={text} onChange={(event) => setText(event.target.value)} />
    <button onClick={() => {
      if(text.trim() === "") {
        setError("Por favor, preencher alguma coisa.")
        return;
      } else {
        setError("");
      }
      
      setTasks((arrayAntigo) =>
      [...arrayAntigo, {text: text, done: false} ])
      setText("");
    }}
    >Salvar
    </button>
    <div><span className="error">{error !== "" ? error : null}</span></div>
  </div>

  <ul>
    {tasks.map((task) => (
      <Task {...task} />
    ))}
  </ul>
  </>
  );
}

export type TaskProps = {text: string, done: boolean}

function Task(props: TaskProps) {
  return <li>
    <input type="checkbox" name="done" readOnly={true} checked={props.done} />
    <span>{props.text}</span>
  </li>;
}