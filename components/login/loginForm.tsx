// Dependencies
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Button, Input, FormControl, FormLabel, FormErrorMessage, useToast } from '@chakra-ui/react';
import InputPassword from 'common/inputPassword';
import { loginSchema, ILoginData } from 'forms/login';

// Dynamic
const DangerAlert = dynamic(() => import('common/alerts/danger'));

// Types
interface Props {
    isPyme?: boolean;
    afterLogin?: () => void;
    redirect?: boolean;
}

// Component
const LoginForm: React.FC<Props> = ({ isPyme, afterLogin, redirect = true }) => {
    // State
    const router = useRouter();
    const [alert, setAlert] = useState(false);
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
        const { ok, data: response } = await auth.login({ email: data.email, password: data.password, isPyme });

        if (ok) {
            const { AuthManager } = await import('@clyc/next-route-manager');
            AuthManager.storeToken({
                cookieName: isPyme ? process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME! : process.env.NEXT_PUBLIC_COOKIE_NAME!,
                token: response!.token!,
                options: {
                    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN!,
                    secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === 'TRUE',
                    maxAge: response?.exp,
                },
            });

            toast({
                title: 'Haz iniciado sesión',
                description: 'Haz ingresado con éxito.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });

            if (redirect) {
                router.push((router.query.redirect_to as string) ?? '/explorer');
            }

            setIsLoggingIn(false);
            afterLogin && afterLogin();
        } else {
            toast({
                title: 'No se ha podido iniciar sesión',
                description: 'Ha ocurrido un error al intentar iniciar sesión',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });

            setIsLoggingIn(false);
            setAlert(true);
        }
    };

    // Effects
    useEffect(() => {
        if (router.query.redirect_to as string) {
            router.prefetch(router.query.redirect_to as string);
        } else {
            router.prefetch('/explorer');
        }
    }, [router]);

    return (
        <Stack as="form" w="full" direction="column" spacing="15px" pt="20px" onSubmit={handleSubmit(handleLogin)}>
            <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel fontSize="md">
                    Correo electrónico <span style={{ color: '#4FD1C5' }}>*</span>
                </FormLabel>

                <Input {...register('email')} size="md" />

                <FormErrorMessage textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                    {errors.email?.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl id="password" isInvalid={!!errors.password}>
                <FormLabel fontSize="md">
                    Contraseña <span style={{ color: '#4FD1C5' }}>*</span>
                </FormLabel>

                <InputPassword {...register('password')} size="md" />

                <FormErrorMessage textColor="red.400" fontFamily="inter" fontSize="16px" fontWeight={'medium'}>
                    {errors.password?.message}
                </FormErrorMessage>
            </FormControl>

            {alert && <DangerAlert message={'Correo electrónico o contraseña incorrecto'} />}

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
export default LoginForm;
