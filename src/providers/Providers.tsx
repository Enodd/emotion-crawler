import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UserConnectionProvider } from "@providers/UserConnectionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";

const queryClient = new QueryClient();
const theme = extendTheme({
  initialColorMode: "dark",
});

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <UserConnectionProvider>{children}</UserConnectionProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
};
