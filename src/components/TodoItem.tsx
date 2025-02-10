import { ITodo } from "../types/data"
import { useAppDispatch } from "../hooks"
import { deleteTodo, toggleStatus } from "../store/todoSlice"


const TodoItem: React.FC<ITodo> = ({id, title, completed}) => {
    const dispatch = useAppDispatch()
    
    return <div>
        <input type="checkbox" checked={completed} onChange={() => dispatch(toggleStatus(id))}/>
        {title}
        <button onClick={() => dispatch(deleteTodo(id))}>X</button>
    </div>
}

export default TodoItem
