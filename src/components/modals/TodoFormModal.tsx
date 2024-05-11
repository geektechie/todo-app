import TodoForm from "../TodoForm"
import { Modal } from "antd"
import type Todo from "../../types/todo"

const TodoFormModal = ({
  open,
  setOpen,
  todo,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  todo?: Todo
}) => {
  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <Modal
      title={`${todo ? "Update" : "Add"} Todo`}
      open={open}
      onCancel={handleCloseModal}
      footer={null}
    >
      <TodoForm todo={todo} closeModal={handleCloseModal} />
    </Modal>
  )
}

export default TodoFormModal
