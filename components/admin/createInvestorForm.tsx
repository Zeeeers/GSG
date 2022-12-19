// Dependencies
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { addInvestorShape, IInvestorData } from 'forms/addInvestor';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Component
const AddInvestorForm: React.FC = () => {
    // State
    const toast = useToast();
    const [isCreateInvestor, setIsCreateInvestor] = useState(false);
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<IInvestorData>({
        resolver: zodResolver(addInvestorShape),
    });

    const handleCreateInvestor = async (data: IInvestorData) => {
        setIsCreateInvestor(true);

        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const AuthManager = (await auth).default;

        const { createInvestor } = await import('services/api/lib/user');
        const { ok } = await createInvestor({
            data: { ...data, password: 'asdasdasd', password_confirmation: 'asdasdasd' },
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME! }).token,
        });

        if (ok) {
            setIsCreateInvestor(false);
            reset();
            toast({
                title: 'Inversionista creado',
                description: 'Se ha enviado una invitación a su correo electrónico.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        } else {
            setIsCreateInvestor(false);
            toast({
                title: 'No se pudo crear el inversionista',
                description: 'Hubo un problema al intentar crear al inversionista',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    return (
        <>
            <Stack
                as="form"
                w={{ base: 'full', md: '537px' }}
                direction="column"
                spacing="17px"
                mt="23px"
                onSubmit={handleSubmit(handleCreateInvestor)}
            >
                <FormControl id="name" isInvalid={!!errors.name} w="full">
                    <FormLabel fontSize="md">Nombre y apellido</FormLabel>

                    <Input {...register('name')} size="md" />

                    <FormErrorMessage fontWeight={'semibold'}>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl id="email" isInvalid={!!errors.email} w="full">
                    <FormLabel fontSize="md">Correo electrónico</FormLabel>

                    <Input {...register('email')} size="md" />

                    <FormErrorMessage fontWeight={'semibold'}>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <Stack w="full">
                    <Button
                        mt="17px"
                        type="submit"
                        variant="solid"
                        isLoading={isCreateInvestor}
                        loadingText={'Crear invitación'}
                        w={'full'}
                        h="40px"
                        mb={4}
                    >
                        Enviar invitación
                    </Button>
                </Stack>
            </Stack>
        </>
    );
};

// Export
export default AddInvestorForm;
