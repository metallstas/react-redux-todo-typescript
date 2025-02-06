import { useState, useEffect, useRef } from "react"
import { useAppDispatch } from "../hooks"
import { addTodo } from "../store/todoSlice"
import TodoList from "./TodoList"

const App: React.FC = () => {
    const [value, setValue] = useState('')

    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)

    const addTask = () => {
        dispatch(addTodo(value))
        setValue('')
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

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
            <TodoList />
        </div>
    )
}

export default App
