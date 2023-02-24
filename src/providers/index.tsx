import AntDesignConfigProvider from "@providers/antd";
import StoreProvider from "@providers/store";
import ThemeProvider from "@providers/theme";

export interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <AntDesignConfigProvider>{children}</AntDesignConfigProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
