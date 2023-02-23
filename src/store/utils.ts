import { useSelector as useSelectorBase, TypedUseSelectorHook } from "react-redux";
import { RootState } from "@store";

// a wrapper that uses React-Redux useSelector with RootState passed by default
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
