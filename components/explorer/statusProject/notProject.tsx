import { Button, HStack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

const NotProject = () => {
    const router = useRouter();
    return (
        <HStack bg="gray.700" p="20px" rounded="8px" w="full" mb="40px" justifyContent="space-between">
            <Text fontSize="24px" fontWeight="bold" fontFamily="barlow" textTransform="uppercase">
                Postula tu proyecto aquí
            </Text>
            <Button
                bg="blue.700"
                _hover={{ bg: 'blue.600' }}
                onClick={() => router.push('/creator')}
                variant="solid"
                h="40px"
            >
                Postular proyecto
            </Button>
        </HStack>
    );
};

export default NotProject;
