import { useState, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { addTodo, fetchTodos } from "../store/todoSlice"
import TodoList from "./TodoList"

const App: React.FC = () => {
    const [value, setValue] = useState('')
    const {error, status} = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)

    const addTask = () => {
        dispatch(addTodo(value))
        setValue('')
    }

    useEffect(() => {
        dispatch(fetchTodos())

        if (inputRef.current) {
            inputRef.current.focus()
        }

    }, [dispatch])

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        setValue(e.target.value)
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    return (
        <div>
            <div>
                <input 
                    value={value} 
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} 
                    ref={inputRef}/>
                <button onClick={addTask}>Add</button>
            </div>
            {status === 'loading' && <h2>Loading...</h2>}
            {error && <h2>An error occurred: {error}</h2>}
            <TodoList />
        </div>
    )
}

export default App
