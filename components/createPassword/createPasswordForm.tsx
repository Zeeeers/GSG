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
};

// Component
const CreatePasswordForm: React.FC<Props> = ({ token }) => {
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
            password: data.newPassword,
        });

        if (ok) {
            toast({
                title: 'Contraseña creada.',
                description: 'La contraseña ha sido creada con éxito',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            router.push('/login');
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

                <InputPassword {...register('newPassword')} fontWeight="normal" size="md" />

                <FormErrorMessage fontWeight="semibold">{errors.newPassword?.message}</FormErrorMessage>
            </FormControl>

            <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
                <FormLabel fontSize="md" fontWeight="medium">
                    Confirmar contraseña
                </FormLabel>

                <InputPassword {...register('confirmPassword')} fontWeight="normal" size="md" />

                <FormErrorMessage fontWeight="semibold">{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>

            <Stack w="full">
                <Button
                    mt="17px"
                    type="submit"
                    variant="solid"
                    isLoading={isChangingPass}
                    loadingText={'Creando contraseña'}
                    w={'full'}
                    mb="30px"
                    py="20px"
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
