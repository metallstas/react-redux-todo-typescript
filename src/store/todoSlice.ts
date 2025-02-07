import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITodo } from "../types/data";

interface ITodosState {
    todos: ITodo[]
    status: string
    error: any
}
 
export const fetchTodos = createAsyncThunk(
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

const initialState: ITodosState = {
    todos: [],
    status: 'idling',
    error: '',
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.todos.push({
                id: Date.now().toString(),
                title: action.payload,
                completed: false,
            })
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        }, 
        toggleTodoComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload)
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed
            }
        }  

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading'
                state.error = ''
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'idling'
                state.todos = action.payload
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.payload
            })
        // [fetchTodos.pending]: (state, action) => {
        //     state.status = 'loading'
        //     state.error = null
        // },
        // [fetchTodos.fulfilled]: (state, action) => {
        //     state.status = 'resolved'
        //     state.todos = action.payload
        // },
        // [fetchTodos.rejected]: (state, action) => {},
    }
})

export const {addTodo, removeTodo, toggleTodoComplete} = todoSlice.actions

export default todoSlice.reducer
