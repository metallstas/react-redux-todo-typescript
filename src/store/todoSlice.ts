import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../types/data";

interface ITodosState {
    todos: ITodo[]
}

const initialState: ITodosState = {
    todos: [],
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos.push({
                id: Date.now().toString(),
                title: action.payload,
                complete: false,
            })
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        }, 
        toggleTodoComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload)
            if (toggledTodo) {
                toggledTodo.complete = !toggledTodo.complete
            }
        }  

    }
})

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions

export default todoSlice.reducer
