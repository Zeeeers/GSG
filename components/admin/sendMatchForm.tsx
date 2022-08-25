// Dependencies
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMatchData, sendMatchShape } from 'forms/sendMatch';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Component
const SendMatchForm: React.FC = () => {
    // State
    const toast = useToast();
    const [isSendMatch, setIsSendMatch] = useState(false);
    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
    } = useForm<IMatchData>({
        resolver: zodResolver(sendMatchShape),
    });

    const handleSendMatch = async (data: IMatchData) => {
        setIsSendMatch(true);

        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const AuthManager = (await auth).default;

        const { sendMatch } = await import('services/api/lib/user');
        const { ok } = await sendMatch({
            data,
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_ADMIN_COOKIE_NAME! }).token,
        });

        if (ok) {
            setIsSendMatch(false);
            reset();
            toast({
                title: 'Match enviado',
                description: 'Se ha enviado una match al correo ingresado.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        } else {
            setIsSendMatch(false);
            toast({
                title: 'Error',
                description: 'Hubo un problema al intentar enviar el match',
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
                w="full"
                direction="column"
                spacing="17px"
                mt="23px"
                onSubmit={handleSubmit(handleSendMatch)}
            >
                <FormControl w={{ base: 'full', lg: '537px' }} id="email" isInvalid={!!errors.email}>
                    <FormLabel fontSize="md">Correo electrónico</FormLabel>

                    <Input {...register('email')} size="md" />

                    <FormErrorMessage fontWeight={'semibold'}>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <Stack w={{ base: 'full', lg: '537px' }}>
                    <Button
                        mt="17px"
                        type="submit"
                        variant="solid"
                        isLoading={isSendMatch}
                        loadingText={'Enviando match'}
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
export default SendMatchForm;
