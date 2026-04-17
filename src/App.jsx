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
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-fuchsia-900 px-4 py-10'>
      <div className='mx-auto w-full max-w-3xl rounded-4xl border border-white/10 bg-white/95 p-8 shadow-2xl shadow-indigo-900/30 backdrop-blur-xl'>
        <div className='mb-6 space-y-3 text-center'>
          <p className='text-sm uppercase tracking-[0.24em] text-indigo-600'>Daily productivity</p>
          <h1 className='text-4xl font-semibold text-slate-900 sm:text-5xl'>Beautiful Todo App</h1>
          <p className='mx-auto max-w-2xl text-sm leading-6 text-slate-600'>Add tasks, filter by status, and keep your workflow tidy with a fresh and modern interface.</p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-3 sm:flex-row sm:items-center'>
          <input
            type="text"
            placeholder="Add a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className='w-full rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3 text-slate-900 shadow-sm outline-none transition duration-200 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-200'
          />

          <button
            type="submit"
            disabled={!task.trim()}
            className='inline-flex justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-200 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300'
          >
            Add Task
          </button>
        </form>

        <div className='mt-8 rounded-3xl border border-slate-200/70 bg-slate-50 p-4 shadow-sm'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <h2 className='text-xl font-semibold text-slate-900'>Todo List</h2>
            <button
              onClick={clearAll}
              disabled={todos.length === 0}
              className='rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50'
            >
              Clear All
            </button>
          </div>

          <div className='mt-4 flex flex-wrap items-center gap-2 text-sm'>
            {['all', 'completed', 'active'].map((option) => (
              <button
                key={option}
                type='button'
                onClick={() => setFilter(option)}
                disabled={filter === option}
                className={`rounded-full px-4 py-2 transition duration-200 ${filter === option ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
              >
                {option === 'all' ? 'All' : option === 'completed' ? 'Completed' : 'Pending'}
              </button>
            ))}
          </div>

          {filteredTodos.length === 0 ? (
            <p className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-100 px-4 py-6 text-center text-slate-600'>
              {filter === 'completed'
                ? 'No completed tasks'
                : filter === 'active'
                  ? 'No pending tasks'
                  : 'No tasks found'}
            </p>
          ) : (
            <ul className='mt-6 space-y-3'>
              {filteredTodos.map((todo) => (
                <li key={todo.id} className='flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition duration-200 hover:shadow-md'>
                  <div className='flex items-center gap-3 min-w-0'>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className='h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500'
                    />

                    <span
                      className='min-w-0 wrap-break-words text-slate-900'
                      style={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                      }}
                    >
                      {todo.text}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className='rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-rose-600'
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
