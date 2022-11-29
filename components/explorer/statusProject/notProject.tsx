import { Button, Stack, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const NotProject = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const createDraft = async () => {
        const { create } = await import('../../../services/api/lib/gsg');
        setLoading(true);

        try {
            const { ok, data } = await create({ project: { status: 'sketch' } });

            if (ok) {
                router
                    .push({ pathname: '/creator', query: { id: data?.data?.gsg_project?.id } })
                    .then(() => setLoading(false));
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                loadingText="Cargando proyecto..."
                isLoading={loading}
                bg="blue.700"
                _hover={{ bg: 'blue.600' }}
                onClick={createDraft}
                variant="solid"
                h="40px"
            >
                Postular proyecto
            </Button>
        </Stack>
    );
};

export default NotProject;
