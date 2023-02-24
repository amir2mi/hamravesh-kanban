import { ConfigProvider, theme as antdThemes } from "antd";
import type { ProvidersProps } from "@providers";
import { useSelector } from "@store/utils";

export default function AntDesignConfigProvider({ children }: ProvidersProps) {
  const { theme } = useSelector((store) => store.userInterface);
  const isLight = theme === "light";

  const validateMessages = {
    required: "تکمیل ${label} الزامی است",
  };

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
      form={{ validateMessages }}
    >
      {children}
    </ConfigProvider>
  );
}
