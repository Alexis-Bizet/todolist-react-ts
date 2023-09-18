import { ChangeEvent, FC, useState, useRef, useEffect } from "react";
import "./App.css";

interface Task {
  task: string;
  isEditing: boolean;
}

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todoList]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  }

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask: Task = { task: task, isEditing: false };
      setTodoList([...todoList, newTask]);
      setTask("");
    }
  }

  const deleteTask = (taskToDelete: Task) => {
    const updatedTodoList = todoList.filter((todo) => todo !== taskToDelete);
    setTodoList(updatedTodoList);
  }

  const startEditingTask = (taskToEdit: Task) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo === taskToEdit) {
        return { ...todo, isEditing: true };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  }

  const handleTextChange = (editedTask: Task, newText: string) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo === editedTask) {
        return { ...todo, task: newText };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  }

  const editTask = (taskToSave: Task) => {
    const updatedTodoList = todoList.map((todo) => {
      if (todo === taskToSave) {
        return { ...todo, isEditing: false };
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  }

  return (
    <div className="App">
      <div className="Header">
        <input
          type="text"
          placeholder="Ce que je dois faire..."
          onChange={handleChange}
          value={task}
        />
        <button onClick={addTask}>Ajouter</button>
      </div>
      <div className="Tasks">
        <h2>Tâches à faire:</h2>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.task}>
              {todo.isEditing ? (
                <div>
                  <input
                    type="text"
                    value={todo.task}
                    onChange={(e) => handleTextChange(todo, e.target.value)}
                    ref={inputRef}
                  />
                  <button onClick={() => editTask(todo)}>Enregistrer</button>
                </div>
              ) : (
                <>
                  {todo.task}
                  <button 
                  onClick={() => deleteTask(todo)}
                  >
                    ×
                    </button>
                  <button 
                  onClick={() => startEditingTask(todo)}
                  >
                    Modifier
                    </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App;
