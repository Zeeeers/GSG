// Dependencies
import { useState } from 'react';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Button, Input, FormControl, FormLabel, FormErrorMessage, Link, useToast } from '@chakra-ui/react';
import { IRecoveryData, recoverySchema } from 'forms/recovery';
import { recoverPassword } from 'services/api/lib/auth';

// Component
const RecoveryForm: React.FC = () => {
    // State
    const [isRecoveryPassword, setIsRecoveryPassword] = useState(false);
    const toast = useToast();
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<IRecoveryData>({
        resolver: zodResolver(recoverySchema),
    });

    // Handlers
    const handleRecovery = async (data: IRecoveryData) => {
        setIsRecoveryPassword(true);
        const { ok } = await recoverPassword({ email: data.email });

        if (ok) {
            router.push('/recovery/recoverySuccess');
            setIsRecoveryPassword(false);
        } else {
            setIsRecoveryPassword(false);
            toast({
                title: 'No se pudo enviar la recuperación de contraseña',
                description: 'Ha ocurrido un error al intentar recuperar la contraseña, porfavor, intentelo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            reset();
        }
    };

    return (
        <Stack as="form" w="full" direction="column" spacing="20px" pt="30px" onSubmit={handleSubmit(handleRecovery)}>
            <FormControl>
                <FormLabel fontSize="md" fontWeight="medium">
                    Escribe tu correo para que te enviemos un enlace de reestablecimiento
                </FormLabel>

                <Input {...register('email')} type="email" fontWeight="normal" size="md" />

                <FormErrorMessage fontWeight="semibold">{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <Stack w="full">
                <Button
                    mt="17px"
                    type="submit"
                    variant="solid"
                    isLoading={isRecoveryPassword}
                    loadingText={'Enviando correo'}
                    w={'full'}
                    mb="30px"
                    py="20px"
                    h="44px"
                >
                    Enviar correo
                </Button>
                <Link href="/login">
                    <Button variant="unstyled" w={'full'} py="20px" h="44px" textDecoration="underline">
                        Volver atrás
                    </Button>
                </Link>
            </Stack>
        </Stack>
    );
};

// Export
export default RecoveryForm;
