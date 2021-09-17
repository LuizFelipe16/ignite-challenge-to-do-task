import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function generatedId() {
    return Math.floor(Math.random() * (100 - 1000 + 1) + 1000);
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) {
      return window.alert('Preencha o título da tarefa.');
    }

    const id = generatedId();

    const task: Task = {
      id: id,
      title: newTaskTitle,
      isComplete: false,
    }

    const result = tasks.find(task => task.id === task.id);

    if (result) {
      const newtask: Task = {
        id: generatedId(),
        title: newTaskTitle,
        isComplete: false,
      }

      setTasks([...tasks, newtask]);
    } else {
      setTasks([...tasks, task]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const index = tasks.findIndex(task => task.id === id);

    if (tasks[index].isComplete === false) {
      tasks[index].isComplete = true
    } else {
      tasks[index].isComplete = false
    }

    setTasks([...tasks]);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const index = tasks.findIndex(task => task.id === id);

    tasks.splice(index, 1);

    setTasks([...tasks]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}