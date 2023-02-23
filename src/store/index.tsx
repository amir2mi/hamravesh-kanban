import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "@store/todos";
import userInterfaceSlice from "@store/userInterface";

// create store with slices
export const store = configureStore({
  reducer: {
    todos: todosSlice,
    userInterface: userInterfaceSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type of the store properties
export type AppDispatch = typeof store.dispatch;
