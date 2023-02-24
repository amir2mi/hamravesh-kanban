import { ConfigProvider, theme as antdThemes } from "antd";
import type { ProvidersProps } from "@providers";
import { useSelector } from "@store/utils";
import { useEffect } from "react";

export default function UserInterfaceProvider({ children }: ProvidersProps) {
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

  return (
    <ConfigProvider
      direction="rtl"
      theme={{
        algorithm: [isLight ? antdThemes.defaultAlgorithm : antdThemes.darkAlgorithm],
        token: {
          colorPrimary: "#4c3faf",
          fontFamily: "vazirmatn, sans-serif",
          colorBgBase: isLight ? "#fff" : "#1f1e27",
          colorBgLayout: isLight ? "#fff" : "#121119",
          colorBorderSecondary: isLight ? "#f0f0f0" : "transparent",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
