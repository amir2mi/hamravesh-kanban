import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInterfaceStateProps {
  theme: "light" | "dark";
}

const initialState: UserInterfaceStateProps = {
  theme: "dark",
};

const userInterfaceSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<UserInterfaceStateProps["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

const { reducer, actions } = userInterfaceSlice;

export default reducer;
export const { changeTheme } = actions;
