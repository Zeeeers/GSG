// Dependencies
import {
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMatchData, sendMatchShape } from 'forms/sendMatch';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// Component
const SendMatchForm: React.FC = () => {
    // State
    const [isDestinator, setIsDestinator] = useState(false);
    const toast = useToast();
    const [isSendMatch, setIsSendMatch] = useState(false);
    const {
        register,
        formState: { errors },
        reset,
        resetField,
        handleSubmit,
    } = useForm<IMatchData>({
        resolver: zodResolver(sendMatchShape),
    });

    const handleSendMatch = async ({ email, destinary }: IMatchData) => {
        setIsSendMatch(true);

        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const AuthManager = (await auth).default;

        const { sendMatch } = await import('services/api/lib/user');
        const { ok, status } = await sendMatch({
            data: {
                email: email,
                destinary: isDestinator ? destinary : email,
            },

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

            if (status === 404) {
                toast({
                    title: 'Error',
                    description: `${
                        isDestinator ? 'Los correos ingresados no tienen' : 'El correo ingresado no tiene'
                    } a ningún inversionista vinculado`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Hubo un problema al intentar enviar el match',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
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

                <HStack>
                    <Text>¿Deseas agregar a un destinatario?</Text>
                    <Checkbox
                        onChange={(e) => {
                            setIsDestinator(e.target.checked);
                            resetField('destinary');
                        }}
                    />
                </HStack>

                {isDestinator && (
                    <FormControl w={{ base: 'full', lg: '537px' }} id="email" isInvalid={!!errors.destinary}>
                        <FormLabel fontSize="md">Destinatario</FormLabel>

                        <Input {...register('destinary')} size="md" />

                        <FormErrorMessage fontWeight={'semibold'}>{errors.destinary?.message}</FormErrorMessage>
                    </FormControl>
                )}

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
                        Enviar match
                    </Button>
                </Stack>
            </Stack>
        </>
    );
};

// Export
export default SendMatchForm;
