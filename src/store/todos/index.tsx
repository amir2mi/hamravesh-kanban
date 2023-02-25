import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mockData from "./mock.json";

export type TodosStatus = "todo" | "inProgress" | "done";

export interface TodoItemProps {
  description?: string;
  id: number | string;
  title: string;
  type: "easy" | "hard" | string;
  status: TodosStatus;
}

interface ReorderTodoProps {
  fromIndex: number;
  toIndex: number;
  fromStatus: TodosStatus;
  toStatus: TodosStatus;
}

interface ModifyTodoProps {
  todo: TodoItemProps;
  status: TodosStatus;
}

interface RemoveTodoProps {
  id: TodoItemProps["id"];
  status: TodosStatus;
}

interface TodosStateProps {
  todo: TodoItemProps[];
  inProgress: TodoItemProps[];
  done: TodoItemProps[];
}

// const initialState: TodosStateProps = mockData as TodosStateProps;
const initialState: TodosStateProps = {
  todo: [],
  inProgress: [],
  done: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ModifyTodoProps>) => {
      const { todo, status } = action.payload;

      todo.id = Date.now();
      todo.status = status;
      state[status].unshift(todo);
    },
    editTodo: (state, action: PayloadAction<ModifyTodoProps>) => {
      const { todo, status } = action.payload;
      state[status] = state[status].map((thisTodo) => (thisTodo.id === todo.id ? todo : thisTodo));
    },
    removeTodo: (state, action: PayloadAction<RemoveTodoProps>) => {
      const { id, status } = action.payload;
      state[status] = state[status].filter((todo) => todo.id !== id);
    },
    reorderTodo: (state, action: PayloadAction<ReorderTodoProps>) => {
      const { fromIndex, toIndex, fromStatus, toStatus } = action.payload;

      // should check if reorder was between different statuses or in the same column
      if (fromStatus === toStatus) {
        state[fromStatus] = arrayMove(state[fromStatus], fromIndex, toIndex);
      } else {
        const itemToMove = state[fromStatus][fromIndex];
        // remove from current status
        state[fromStatus] = state[fromStatus].filter(({ id }) => id !== itemToMove.id);
        // add current to target status at given index
        itemToMove.status = toStatus;
        state[toStatus].splice(toIndex, 0, itemToMove);
      }
    },
  },
});

const { reducer, actions } = todosSlice;

export default reducer;
export const { addTodo, editTodo, reorderTodo, removeTodo } = actions;
