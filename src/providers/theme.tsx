import type { ProvidersProps } from "@providers";
import { useSelector } from "@store/utils";
import { useEffect } from "react";

export default function ThemeProvider({ children }: ProvidersProps) {
  const { theme } = useSelector((store) => store.userInterface);
  const isLight = theme === "light";

  useEffect(() => {
    let classesToAdd = [];
    let classesToRemove = [];

    if (isLight) {
      classesToAdd = ["light"];
      classesToRemove = ["dark"];
    } else {
      classesToAdd = ["dark"];
      classesToRemove = ["light"];
    }

    document?.documentElement.classList.add(...classesToAdd);
    document?.documentElement.classList.remove(...classesToRemove);
  }, [theme]);

  return <>{children}</>;
}
