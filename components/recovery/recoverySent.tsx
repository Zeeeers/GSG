// Dependencies
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRecoveryStore } from 'stores/recovery';
import { Button, Heading, Stack, Text, useToast } from '@chakra-ui/react';

// Dynamic
const SuccessNotification = dynamic(() => import('common/notifications/success'));

// Component
const RecoverySent: React.FC = () => {
    // States
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const recoveryEmail = useRecoveryStore((state) => state.email);
    const setRecoveryStatus = useRecoveryStore((state) => state.updateStatus);
    const toast = useToast();

    // Handlers
    const handleReSendEmail = async () => {
        setIsSendingEmail(true);

        const { recoverPassword } = await import('services/api/lib/auth');
        const { ok } = await recoverPassword({ email: recoveryEmail, kind: 'company_skala' });

        if (ok) {
            toast({
                position: 'top-right',
                duration: 2000,
                render: () => (
                    <SuccessNotification
                        title={'Envío exitoso'}
                        description={'El correo de recuperación ha sido enviado correctamente a la dirección indicada.'}
                    />
                ),
            });
        }

        setIsSendingEmail(false);
    };

    return (
        <>
            <Heading as="h1" size="4xl" fontWeight="bold">
                Recuperación enviada correctamente
            </Heading>

            <Text my={8}>
                Si <Text as="strong">{recoveryEmail}</Text> existe en nuestras bases de datos recibirás un mensaje con
                las instrucciones para recuperar tu cuenta y crear una nueva contraseña.
            </Text>

            <Text fontSize="md" fontWeight="semibold" textAlign={{ base: 'center', md: 'left' }}>
                ¿No has recibido el correo electrónico?
            </Text>

            <Stack direction={{ base: 'column', md: 'row' }} my={4} align={{ base: 'start', lg: 'center' }}>
                <Button
                    w={{ base: 'full', md: 'fit-content' }}
                    variant="solid"
                    isLoading={isSendingEmail}
                    loadingText={'Reenviando mensaje'}
                    onClick={() => {
                        handleReSendEmail();
                    }}
                >
                    Reenviar mensaje
                </Button>

                <Text fontSize="md" alignSelf={{ base: 'center' }}>
                    o
                </Text>

                <Button
                    variant="outline"
                    w={'fit-content'}
                    onClick={() => {
                        setRecoveryStatus('FORM');
                    }}
                >
                    Intentar con un correo electrónico diferente
                </Button>
            </Stack>
        </>
    );
};

// Export
export default RecoverySent;
