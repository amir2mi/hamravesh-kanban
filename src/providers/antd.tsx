import { ConfigProvider, theme as antdThemes } from "antd";
import type { ProvidersProps } from "@providers";
import { useSelector } from "@store/utils";

export default function AntDesignConfigProvider({ children }: ProvidersProps) {
  const { theme } = useSelector((store) => store.userInterface);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === "light" ? antdThemes.defaultAlgorithm : antdThemes.darkAlgorithm,
        token: {
          colorPrimary: "#4c3faf",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
