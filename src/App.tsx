import { useState } from "react"
import { Button } from "antd"
import TodoList from "./components/TodoList"
import TodoFormModal from "./components/modals/TodoFormModal"
import "sweetalert2/src/sweetalert2.scss"
import "./App.css"

const App = () => {
  const [open, setOpen] = useState(false)

  const handleOpenTodoForm = () => {
    setOpen(true)
  }

  return (
    <div className="app">
      <h1 className="header">Todo List</h1>
      <div className="addButton">
        <Button type="primary" onClick={handleOpenTodoForm}>
          Add Todo
        </Button>
      </div>
      <div className="todoList">
        <TodoList />
      </div>
      <TodoFormModal open={open} setOpen={setOpen} />
    </div>
  )
}

export default App
