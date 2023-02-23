import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateProps {
  theme: "light" | "dark";
}

const initialState: initialStateProps = {
  theme: "light",
};

const userInterfaceSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<initialStateProps["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

const { reducer, actions } = userInterfaceSlice;

export default reducer;
export const { changeTheme } = actions;
