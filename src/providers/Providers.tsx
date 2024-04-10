import { ChakraProvider } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return <ChakraProvider>
        {children}
    </ChakraProvider>;
};