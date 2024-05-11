import { useState } from "react"
import { Checkbox, Col, Row } from "antd"
import { deleteTodo, toggleTodo } from "../features/todo.slice"
import type Todo from "../types/todo"
import { DeleteFilled, EditFilled } from "@ant-design/icons"
import TodoFormModal from "./modals/TodoFormModal"
import { useAppDispatch } from "../app/hooks"
import Swal from "sweetalert2"

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  const handleOpenTodoForm = () => {
    setOpen(true)
  }

  const handleToggleTodo = () => {
    dispatch(toggleTodo(todo.id))
  }

  const handleDeleteTodo = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        dispatch(deleteTodo(todo.id))
        Swal.fire({
          title: "Deleted!",
          text: "Your todo item has been deleted.",
          icon: "success",
        })
      }
    })
  }

  const renderStrikeThrough = () => {
    return {
      textDecoration: todo.completed ? "line-through" : "none",
    }
  }

  return (
    <>
      <Row gutter={[16, 16]} className="item_row">
        <Col>
          <Checkbox
            checked={todo.completed}
            onChange={handleToggleTodo}
            style={renderStrikeThrough()}
          >
            {todo.title}
          </Checkbox>
        </Col>
        <Col className="item_col">
          <EditFilled className="todo_icon" onClick={handleOpenTodoForm} />
          <DeleteFilled className="todo_icon" onClick={handleDeleteTodo} />
        </Col>
      </Row>
      <TodoFormModal todo={todo} open={open} setOpen={setOpen} />
    </>
  )
}

export default TodoItem
