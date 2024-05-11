import { List } from "antd"
import TodoItem from "./TodoItem"
import type Todo from "../types/todo"
import { useAppSelector } from "../app/hooks"

const TodoList = () => {
  const todos = useAppSelector((state: any) => state.todo.todos)
  const sortedTodos = todos
    ?.slice()
    .sort((x: Todo, y: Todo) => Number(x.completed) - Number(y.completed))

  return (
    <List
      className="todoList_main"
      dataSource={sortedTodos}
      renderItem={(todo: Todo) => (
        <List.Item key={todo.id}>
          <TodoItem todo={todo} />
        </List.Item>
      )}
    />
  )
}

export default TodoList
