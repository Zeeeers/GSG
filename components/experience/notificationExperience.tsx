import { Button, Text, useDisclosure, VStack } from '@chakra-ui/react';
import OnboardingModal from 'components/profile/ods/onboardingModal';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useUser } from 'services/api/lib/user';
import { Frequency } from 'services/api/types/User';

interface NotificationExperienceProps {
    setPage: (index: number) => void;
    setStepStatus: (status: 'Process' | 'DisabledNotification' | 'Finished') => void;
}

const NotificationExperience = ({ setPage, setStepStatus }: NotificationExperienceProps) => {
    const { data: userResponse } = useUser();

    const { isOpen: isOpenOnboarding, onOpen: openOnboarding, onClose: closeOnboarding } = useDisclosure();
    const [notification, setNotification] = useState<Frequency>(userResponse?.user?.frequency_newsletter ?? null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateNews = async () => {
        setIsLoading(true);
        const auth = import('@clyc/next-route-manager/libs/AuthManager');
        const userApi = import('../../services/api/lib/user');

        const AuthManager = (await auth).default;
        const { update } = await userApi;

        const { ok } = await update({
            token: new AuthManager({ cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME! }).token,
            data: {
                newsletter: notification !== null ? true : false,
                frequency_newsletter: notification,
            },
        });

        if (ok) {
            setIsLoading(false);

            if (notification !== null) {
                setPage(4);
                setStepStatus('Process');
            } else {
                setStepStatus('DisabledNotification');
            }
        }
    };

    return (
        <>
            <VStack
                as={motion.form}
                initial={{ x: -200, opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { type: 'spring', duration: 0.8 } }}
                w="full"
                align="start"
                spacing="48px"
            >
                <VStack align="start" spacing="32px">
                    <Text fontSize="3xl" fontWeight="bold" textTransform="uppercase">
                        ¡Recibe tu correo Match!
                    </Text>

                    <VStack align="start" spacing="16px">
                        <VStack>
                            <Text fontSize="2xl" fontFamily="inter" lineHeight="32px">
                                ¿Con qué frecuencia deseas recibir correos con proyectos de alto impacto que hagan match
                                en relación a tus intereses?
                            </Text>
                            <Text fontSize="16px" fontFamily="inter" lineHeight="22.4px" textColor="gray.400">
                                Se te enviará un correo con un resumen de todos los proyectos que hayan coincidido con
                                algún interés que tengas.
                            </Text>
                        </VStack>
                        <Button
                            variant="link"
                            color="gray.50"
                            fontWeight="normal"
                            textDecor="underline"
                            onClick={openOnboarding}
                        >
                            Ver ejemplo de correo
                        </Button>
                    </VStack>

                    <VStack spacing="16px" w="full">
                        <Button
                            justifyContent="start"
                            variant="solid"
                            h="40px"
                            w="full"
                            bg={notification === 'biweekly' ? 'teal.800' : 'gray.600'}
                            _hover={{ bg: notification === 'biweekly' ? 'teal.700' : 'teal.600' }}
                            onClick={() => setNotification('biweekly')}
                        >
                            De forma quincenal
                        </Button>
                        <Button
                            justifyContent="start"
                            variant="solid"
                            h="40px"
                            w="full"
                            bg={notification === 'monthly' ? 'teal.800' : 'gray.600'}
                            _hover={{ bg: notification === 'monthly' ? 'teal.700' : 'teal.600' }}
                            onClick={() => setNotification('monthly')}
                        >
                            Una vez por mes
                        </Button>
                        <Button
                            justifyContent="start"
                            variant="solid"
                            h="40px"
                            w="full"
                            bg={notification === null ? 'teal.800' : 'gray.600'}
                            _hover={{ bg: notification === null ? 'teal.700' : 'teal.600' }}
                            onClick={() => setNotification(null)}
                        >
                            No deseo recibir correos por ahora
                        </Button>
                    </VStack>
                </VStack>

                <Button
                    type="button"
                    w="full"
                    variant="solid"
                    h="40px"
                    onClick={() => handleUpdateNews()}
                    isLoading={isLoading}
                >
                    Continuar
                </Button>
            </VStack>

            <OnboardingModal isOpen={isOpenOnboarding} onClose={closeOnboarding} />
        </>
    );
};

export default NotificationExperience;
