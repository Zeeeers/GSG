import { Button, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface NotProjectProps {
    openGoal: () => void;
}

const NotProject = ({ openGoal }: NotProjectProps) => {
    return (
        <Stack
            bg="gray.700"
            p="20px"
            rounded="8px"
            w="full"
            mb="40px"
            justifyContent="space-between"
            direction={{ base: 'column', md: 'row' }}
        >
            <VStack align="flex-start">
                <Text fontSize="24px" fontWeight="bold" fontFamily="barlow" textTransform="uppercase">
                    Postula tu proyecto aquí
                </Text>
                <Text color="gray.400" fontFamily="inter" fontSize="14px">
                    Tiempo aproximado: 10 a 15 min
                </Text>
            </VStack>
            <Button
                display="flex"
                bg="blue.700"
                _hover={{ bg: 'blue.600' }}
                onClick={openGoal}
                variant="solid"
                h="40px"
            >
                Postular proyecto
            </Button>
        </Stack>
    );
};

export default NotProject;
