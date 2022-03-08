// Dependencies
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button, FormControl, FormErrorMessage, FormLabel, useToast, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePassSchema, IChangePassData } from 'forms/passwordChange';
import InputPassword from 'common/inputPassword';

// Dynamic
const SuccessNotification = dynamic(() => import('common/notifications/success'));
const ErrorNotification = dynamic(() => import('common/notifications/error'));

// Components
const ChangePassword: React.FC = () => {
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

        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const userApi = import('services/api/lib/user');

        const AuthManager = (await auth).default;
        const { update } = await userApi;

        const { ok } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            data: {
                old_password: data.password,
                password: data.newPassword,
                password_confirmation: data.confirmPassword,
            },
        });

        if (ok) {
            toast({
                position: 'top-right',
                duration: 2000,
                render: () => (
                    <SuccessNotification
                        title={'Actualización exitosa'}
                        description={'La contraseña ha sido actualizada correctamente.'}
                    />
                ),
            });
        } else {
            toast({
                position: 'top-right',
                duration: 2000,
                render: () => (
                    <ErrorNotification
                        title={'Error'}
                        description={'Ha ocurrido un error al cambiar contraseña, por favor, intentalo de nuevo.'}
                    />
                ),
            });
        }

        reset();
        setIsChangingPass(false);
    };

    return (
        <VStack
            as="form"
            align="start"
            mt={6}
            spacing={8}
            w={{ lg: 8 / 12 }}
            onSubmit={handleSubmit(handleChangePassword)}
        >
            <FormControl id="password" isInvalid={!!errors.password?.message}>
                <FormLabel fontSize="lg" fontWeight="bold">
                    Contraseña actual
                </FormLabel>

                <InputPassword {...register('password')} fontWeight="semibold" size="md" />

                <FormErrorMessage fontWeight="semibold">{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="newPassword" isInvalid={!!errors.newPassword}>
                <FormLabel fontSize="lg" fontWeight="bold">
                    Nueva contraseña
                </FormLabel>

                <InputPassword {...register('newPassword')} fontWeight="semibold" size="md" />

                <FormErrorMessage fontWeight="semibold">{errors.newPassword?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
                <FormLabel fontSize="lg" fontWeight="bold">
                    Confirmar contraseña
                </FormLabel>

                <InputPassword {...register('confirmPassword')} fontWeight="semibold" size="md" />

                <FormErrorMessage fontWeight="semibold">{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" variant="solid" loadingText="Guardando cambios" isLoading={isChangingPass}>
                Guardar cambios
            </Button>
        </VStack>
    );
};

// Export
export default ChangePassword;
