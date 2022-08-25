// Dependencies
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import InputPassword from 'common/inputPassword';
import { ILoginData, loginSchema } from 'forms/login';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

// Component
const AdminLoginForm: React.FC = () => {
    // State
    const router = useRouter();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<ILoginData>({
        resolver: zodResolver(loginSchema),
    });

    const toast = useToast();

    // Handlers
    const handleLogin = async (data: ILoginData) => {
        setIsLoggingIn(true);

        const { auth } = await import('services/api/lib/auth');
        const { ok, data: response } = await auth.adminLogin({ email: data.email, password: data.password });

        if (ok) {
            const { AuthManager } = await import('@clyc/next-route-manager');
            AuthManager.storeToken({
                cookieName: process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME!,
                token: response!.token!,
                options: {
                    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN!,
                    secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'TRUE',
                    maxAge: response?.exp,
                },
            });

            router.push((router.query.redirect_to as string) ?? '/admin/dashboard');
            setIsLoggingIn(false);
        } else {
            toast({
                title: 'No se ha podido iniciar sesión',
                description: 'La contraseña o correo electrónico son incorrectos',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            setIsLoggingIn(false);
        }
    };

    // Effects
    useEffect(() => {
        if (router.query.redirect_to as string) {
            router.prefetch(router.query.redirect_to as string);
        } else {
            router.prefetch('/admin/dashboard');
        }
    }, [router]);

    return (
        <Stack as="form" w="full" direction="column" spacing="20px" pt="30px" onSubmit={handleSubmit(handleLogin)}>
            <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel fontSize="md">Correo electrónico</FormLabel>

                <Input {...register('email')} size="md" />

                <FormErrorMessage fontWeight={'semibold'}>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel fontSize="md">Contraseña</FormLabel>

                <InputPassword {...register('password')} size="md" />

                <FormErrorMessage fontWeight={'semibold'}>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            <Stack w="full">
                <Button
                    mt="17px"
                    type="submit"
                    variant="solid"
                    isLoading={isLoggingIn}
                    loadingText={'Iniciando sesión'}
                    w={'full'}
                    mb="30px"
                    py="20px"
                    h="44px"
                >
                    Ingresar
                </Button>
            </Stack>
        </Stack>
    );
};

// Export
export default AdminLoginForm;
