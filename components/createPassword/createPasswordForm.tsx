// Dependencies
// @ts-nocheck
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Button, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import InputPassword from 'common/inputPassword';
import { loginSchema, ILoginData } from 'forms/login';

// Dynamic
const DangerAlert = dynamic(() => import('common/alerts/danger'));

// Types
interface Props {
    isPyme?: boolean;
    afterLogin?: () => void;
}

// Component
const CreatePasswordForm: React.FC<Props> = ({ isPyme, afterLogin }) => {
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

    // Handlers
    const handleLogin = async (data: ILoginData) => {
        router.push('/profile');
    };

    return (
        <Stack as="form" w="full" direction="column" spacing="20px" pt="30px" onSubmit={handleSubmit(handleLogin)}>
            <FormControl>
                <FormLabel fontSize="md" fontWeight="medium">
                    Crea tu contraseña
                </FormLabel>

                <InputPassword fontWeight="normal" size="md" />

                <FormErrorMessage fontWeight="semibold"></FormErrorMessage>
            </FormControl>

            <FormControl id="confirmPassword">
                <FormLabel fontSize="md" fontWeight="medium">
                    Confirmar contraseña
                </FormLabel>

                <InputPassword fontWeight="normal" size="md" />

                <FormErrorMessage fontWeight="semibold"></FormErrorMessage>
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
                    Seleccionar mis intereses
                </Button>
            </Stack>
        </Stack>
    );
};

// Export
export default CreatePasswordForm;
