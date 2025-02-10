import { createSlice, createAsyncThunk, UnknownAction, PayloadAction } from "@reduxjs/toolkit";
import { ITodo } from "../types/data";
import { AnyActionArg } from "react";

interface ITodosState {
    todos: ITodo[]
    status: string
    error: string | null
}
 
export const fetchTodos = createAsyncThunk<ITodo[], void, {rejectValue: string}>(
    'todos/fetchTodos',
    async function(_, {rejectWithValue}) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            if (!response.ok) {
                throw new Error('Server Error')
            }
            const data = await response.json()

            return data
            
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
        
    },
)
export const deleteTodo = createAsyncThunk<string, string, {rejectValue: string}>(
    'todos/deleteTodo',
    async (id, {rejectWithValue}) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            rejectWithValue('Can\'t delete')
        }  
        
        return id
    }
)
export const toggleStatus = createAsyncThunk<ITodo, string, {rejectValue: string, state: {todos: ITodosState}}>(
    'todos/toggleStatus',
    async (id, {rejectWithValue, getState}) => {
        const todo = getState().todos.todos.find((el: any) => el.id === id)

        if (todo) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    completed: !todo?.completed
                })
            })
    
            if (!response.ok) {
                rejectWithValue('Can\'t toggle status.')
            }
    
            // dispatch(toggleTodoComplete(id))
            return (await response.json()) as ITodo
    
        }
        else {
            return rejectWithValue('No such todo in the list')
        }
    }
)
export const addNewTodo = createAsyncThunk<ITodo, string, {rejectValue: string}>(
    'todos/addNewTodo',
    async function(title: string, {rejectWithValue}) {
        try {
            const todo = {
                title,
                userId: 1,
                completed: false,
            }
            const response = await fetch('https://jsonplaceholder.typicode.com/todoss', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })
            if (!response.ok) {
                throw new Error('Server Error')
            }
            return (await response.json()) as ITodo
            
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
        
    },
)

const initialState: ITodosState = {
    todos: [],
    status: 'idling',
    error: '',
}

const isError = (action: UnknownAction) => {
    return action.type.endsWith('rejected')
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // addTodo(state, action: PayloadAction<ITodo>) {
        //     state.todos.push(action.payload)
        // },
        // removeTodo(state, action: PayloadAction<string>) {
        // }, 
        // toggleTodoComplete(state, action: PayloadAction<string>) {
        //     const toggledTodo = state.todos.find(todo => todo.id === action.payload)
        //     if (toggledTodo) {
        //         toggledTodo.completed = !toggledTodo.completed
        //     }
        // }  

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'idling'
                state.todos = action.payload
            })
            .addCase(addNewTodo.pending, (state) => {
                state.error = null
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload)
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
                if (toggledTodo) {
                    toggledTodo.completed = !toggledTodo.completed
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload)
            })
            .addMatcher(isError, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.status = 'idling'
            })
    }
})

// const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions

export default todoSlice.reducer
