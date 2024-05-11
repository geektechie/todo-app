import { useState } from "react"
import type { MouseEventHandler as ReactMouseEventHandler } from "react"
import { Input, Button, Row, Col } from "antd"
import { addTodo } from "../features/todo.slice"
import { v4 as uuidv4 } from "uuid"
import type Todo from "../types/todo"
import { useAppDispatch } from "../app/hooks"
import Swal from "sweetalert2"

const TodoForm = ({
  closeModal,
  todo,
}: {
  closeModal: ReactMouseEventHandler<HTMLElement>
  todo?: Todo
}) => {
  const [title, setTitle] = useState(todo?.title || "")
  const [description, setDescription] = useState(todo?.description || "")
  const dispatch = useAppDispatch()

  const handleStoreTodo = (event: any) => {
    if (title.trim() !== "") {
      dispatch(
        addTodo({
          id: todo?.id || uuidv4(),
          title,
          description,
          completed: false,
        }),
      )
      setTitle("")
      setDescription("")
      closeModal(event)
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Title is required",
      })
    }
  }

  return (
    <>
      <Row className="todo_modal_row">
        <Col span={24}>
          <Input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            size="large"
          />
        </Col>
      </Row>
      <Row className="todo_modal_row">
        <Col span={24}>
          <Input
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            size="large"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="basic__margin-padding" justify="end">
        <Col>
          <Button key="back" onClick={closeModal}>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button key="submit" type="primary" onClick={handleStoreTodo}>
            {todo ? "Update" : "Add"} Todo
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default TodoForm
