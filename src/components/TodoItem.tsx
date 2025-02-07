import { ITodo } from "../types/data"
import { useAppDispatch } from "../hooks"
import { removeTodo, toggleTodoComplete } from "../store/todoSlice"


const TodoItem: React.FC<ITodo> = ({id, title, completed}) => {
    const dispatch = useAppDispatch()
    
    return <div>
        <input type="checkbox" checked={completed} onChange={() => dispatch(toggleTodoComplete(id))}/>
        {title}
        <button onClick={() => dispatch(removeTodo(id))}>X</button>
    </div>
}

export default TodoItem
