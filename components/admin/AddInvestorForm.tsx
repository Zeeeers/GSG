// Dependencies
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Button, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { addInvestorShape, IInvestorData } from 'forms/addInvestor';

// Dynamic
const DangerAlert = dynamic(() => import('common/alerts/danger'));

// Component
const AddInvestorForm: React.FC = () => {
    // State
    const router = useRouter();
    const [alert, setAlert] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<IInvestorData>({
        resolver: zodResolver(addInvestorShape),
    });

    return (
        <Stack as="form" w="full" direction="column" spacing="17px" mt="23px">
            <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel fontSize="md" fontWeight="semibold">
                    Nombre y apellido
                </FormLabel>

                <Input {...register('name')} size="md" />

                <FormErrorMessage fontWeight={'semibold'}>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel fontSize="md" fontWeight="semibold">
                    Correo electrónico
                </FormLabel>

                <Input {...register('email')} size="md" />

                <FormErrorMessage fontWeight={'semibold'}>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <Stack w="full">
                <Button
                    mt="17px"
                    type="submit"
                    variant="solid"
                    isLoading={isLoggingIn}
                    loadingText={'Iniciando sesión'}
                    w={'full'}
                    mb={4}
                >
                    Enviar invitación
                </Button>
            </Stack>
        </Stack>
    );
};

// Export
export default AddInvestorForm;
