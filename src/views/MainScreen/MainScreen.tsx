import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

export const MainScreen: React.FC = () => {
    const { t } = useTranslate();
    return <Box w={'100vw'} display={'flex'} flexDir={'column'} gap={2} justifyContent={'center'} alignItems={'center'}>
        <Box>
            <Text>
                EMOTION CRAWLER
            </Text>
            <Button>
                {t('')}
            </Button>
        </Box>
    </Box>
}