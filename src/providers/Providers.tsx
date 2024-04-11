import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { UserConnectionProvider } from "@providers/UserConnectionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren } from "react";
import { ConfigurationProvider } from "./ConfigurationProvider";

const queryClient = new QueryClient();
const theme = extendTheme({
  initialColorMode: "dark",
  fonts: {
    heading: `'Titan One', sans-serif`,
    body: `'Tilt Neon', sans-serif`,
  },
});

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ConfigurationProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <UserConnectionProvider>{children}</UserConnectionProvider>
        </QueryClientProvider>
      </ChakraProvider>
    </ConfigurationProvider>
  );
};
