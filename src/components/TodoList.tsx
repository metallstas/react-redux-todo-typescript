import TodoItem from "./TodoItem"
import { useAppSelector } from "../hooks"

const TodoList: React.FC = () => {
    const todos = useAppSelector(state => state.todos.todos)
    return <div>
        {
            todos.map(todo => (
                <TodoItem key={todo.id} {...todo}/>
            ))
        }
    </div>
}

export default TodoList
