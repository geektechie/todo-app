import { createSlice } from "@reduxjs/toolkit"
import type Todo from "../types/todo"
import todosJson from "../assets/todos.json"

const initialState: { todos: Todo[] } = {
  todos: todosJson,
}

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      console.log("🚀 ~ action.payload:", action.payload)
      state.todos = [action.payload, ...state.todos]
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    editTodo: (state, action) => {
      const { id, title, description } = action.payload
      const todoIndex = state.todos.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
        const todo = state.todos[todoIndex]
        todo.title = title
        todo.description = description
        state.todos = [
          ...state.todos.slice(0, todoIndex),
          todo,
          ...state.todos.slice(todoIndex + 1),
        ]
      }
    },
    toggleTodo: (state, action) => {
      const id = action.payload
      const todoIndex = state.todos.findIndex(todo => todo.id === id)
      if (todoIndex !== -1) {
        const todo = state.todos[todoIndex]
        todo.completed = !todo.completed
        state.todos = [
          ...state.todos.slice(0, todoIndex),
          todo,
          ...state.todos.slice(todoIndex + 1),
        ]
      }
    },
  },
})

export const { addTodo, deleteTodo, editTodo, toggleTodo } = todoSlice.actions
export const todoReducer = todoSlice.reducer
