import React, { useState, useEffect } from 'react'
import './index.css'

const App = () => {
  const [task, setTask] = useState('')

  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('todos')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []

    }
  })



  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const [filter, setFilter] = useState('all')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (task.trim() === '') return

    const newTodo = {
      id: Date.now() + Math.random(),
      text: task,
      completed: false,
    }

    setTodos(prev => [...prev, newTodo])
    setTask('')
  }


  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    )
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed
    if (filter === 'active') return !todo.completed

    return true
  })

  // for clear all tasks
  const clearAll = () => {
    setTodos([])
  }




  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button type="submit" disabled={!task.trim()}>
          Add Task
        </button>
      </form>

      <h2>Todo List</h2>

      <div>
        <button
          onClick={() => setFilter('all')}
          disabled={filter === 'all'}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          disabled={filter === 'completed'}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('active')}
          disabled={filter === 'active'}
        >
          Pending
        </button>

        <button
          onClick={clearAll} disabled={todos.length === 0}
        >
          Clear All
        </button>
      </div>
      {filteredTodos.length === 0 ? (
        <p>
          {filter === 'completed'
            ? 'No completed tasks'
            : filter === 'active'
              ? 'No pending tasks'
              : 'No tasks found'}
        </p>
      ) : (
        <ul>
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />

              <span
                style={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </span>

              <button onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
