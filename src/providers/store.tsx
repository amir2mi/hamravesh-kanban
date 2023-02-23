import { Provider } from "react-redux";
import { store } from "@store";
import type { ProvidersProps } from "@providers";

export default function StoreProvider({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
