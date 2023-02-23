import AntDesignConfigProvider from "@providers/antd";
import StoreProvider from "@providers/store";

export interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <AntDesignConfigProvider>{children}</AntDesignConfigProvider>
    </StoreProvider>
  );
}
