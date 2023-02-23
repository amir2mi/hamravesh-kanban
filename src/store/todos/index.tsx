import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateProps {
  description?: string;
  id?: number;
  status: "todo" | "inProgress" | "done";
  title: string;
  type: "easy" | "hard";
}

interface reorderTodoProps {
  from: initialStateProps["id"];
  to: initialStateProps["id"];
}

const initialState: initialStateProps[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<initialStateProps>) => {
      const todo = action.payload;
      todo.id = Date.now();
      state.push(todo);
    },
    editTodo: (state, action: PayloadAction<initialStateProps>) => {
      state = state.filter((todo) => (todo.id === action.payload.id ? action.payload : todo));
    },
    reorderTodo: (state, action: PayloadAction<reorderTodoProps>) => {
      // state = state.filter((todo) => (todo.id === action.payload.id ? action.payload : todo));
    },
    removeTodo: (state, action: PayloadAction<initialStateProps["id"]>) => {
      state = state.filter((todo) => todo.id !== action.payload);
    },
  },
});

const { reducer, actions } = todosSlice;

export default reducer;
export const { addTodo, editTodo, reorderTodo, removeTodo } = actions;
