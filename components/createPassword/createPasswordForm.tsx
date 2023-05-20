// Dependencies
import { useState } from 'react';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Button, FormControl, FormLabel, FormErrorMessage, useToast } from '@chakra-ui/react';
import InputPassword from 'common/inputPassword';
import { changePassSchema, IChangePassData } from 'forms/passwordChange';
import { createNewPassword } from 'services/api/lib/auth';

type Props = {
    token: string;
    jwt: string;
    kind?: string;
    isRecovery?: boolean;
};

// Component
const CreatePasswordForm: React.FC<Props> = ({ token, jwt, kind, isRecovery = false }) => {
    // States
    const [isChangingPass, setIsChangingPass] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<IChangePassData>({ resolver: zodResolver(changePassSchema) });
    const toast = useToast();

    // Handlers
    const handleChangePassword = async (data: IChangePassData) => {
        setIsChangingPass(true);

        const { ok } = await createNewPassword({
            token: token,
            //@ts-ignore
            jwt: jwt,
            password: data.newPassword,
            kind,
        });

        if (ok) {
            const { AuthManager } = await import('@clyc/next-route-manager');
            AuthManager.storeToken({
                cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME!,
                token: jwt,
                options: {
                    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN!,
                    secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'TRUE',
                    maxAge: 604800,
                },
            });

            toast({
                title: 'Contraseña creada.',
                description: 'La contraseña ha sido creada con éxito',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });

            if (isRecovery) {
                router.push('/explorer');
            } else {
                router.push('/experience');
            }
        } else {
            toast({
                title: 'No se pudo crear la contraseña',
                description: 'Ha ocurrido un error al crear la contraseña, por favor, intentalo de nuevo.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }

        reset();
        setIsChangingPass(false);
    };

    return (
        <Stack
            as="form"
            w="full"
            direction="column"
            spacing="20px"
            pt="30px"
            onSubmit={handleSubmit(handleChangePassword)}
        >
            <FormControl id="newPassword" isInvalid={!!errors.newPassword}>
                <FormLabel fontSize="md" fontWeight="medium">
                    Crea tu contraseña
                </FormLabel>

                <InputPassword
                    {...register('newPassword')}
                    fontWeight="normal"
                    size="md"
                    variant="flushed"
                    borderColor="gray.700"
                    color="gray.50"
                    fontSize="24px"
                />

                <FormErrorMessage color="red.400" fontWeight="medium">
                    {errors.newPassword?.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
                <FormLabel fontSize="md" fontWeight="medium">
                    Confirmar contraseña
                </FormLabel>

                <InputPassword
                    {...register('confirmPassword')}
                    fontWeight="normal"
                    size="md"
                    variant="flushed"
                    borderColor="gray.700"
                    color="gray.50"
                    fontSize="24px"
                />

                <FormErrorMessage color="red.400" fontWeight="medium">
                    {errors.confirmPassword?.message}
                </FormErrorMessage>
            </FormControl>

            <Stack w="full">
                <Button
                    mt="28px"
                    type="submit"
                    variant="solid"
                    isLoading={isChangingPass}
                    loadingText={'Creando contraseña'}
                    w={'full'}
                    h="44px"
                >
                    Continuar
                </Button>
            </Stack>
        </Stack>
    );
};

// Export
export default CreatePasswordForm;
