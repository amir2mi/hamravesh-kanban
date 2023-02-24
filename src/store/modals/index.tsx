import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TodoItemProps } from "@store/todos";

export interface ModalsStateProps {
  kanban: Partial<TodoItemProps> | undefined;
}

interface SetDataProps {
  prop: keyof ModalsStateProps;
  data: any;
}

const initialState: ModalsStateProps = {
  kanban: undefined,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalData: (state, action: PayloadAction<SetDataProps>) => {
      const { prop, data } = action.payload;
      state[prop] = data;
    },
  },
});

const { reducer, actions } = modalsSlice;

export default reducer;
export const { setModalData } = actions;
