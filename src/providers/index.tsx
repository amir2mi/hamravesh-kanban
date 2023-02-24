import UserInterfaceProvider from "@providers/userInterface";
import StoreProvider from "@providers/store";

export interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <StoreProvider>
      <UserInterfaceProvider>{children}</UserInterfaceProvider>
    </StoreProvider>
  );
}
