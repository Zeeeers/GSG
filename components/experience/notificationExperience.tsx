import { Button, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react';
import OnboardingModal from 'components/profile/ods/onboardingModal';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface NotificationExperienceProps {
    setPage: (index: number) => void;
    setStepStatus: (status: 'Process' | 'DisabledNotification' | 'Finished') => void;
}

const NotificationExperience = ({ setPage, setStepStatus }: NotificationExperienceProps) => {
    const { isOpen: isOpenOnboarding, onOpen: openOnboarding, onClose: closeOnboarding } = useDisclosure();
    const [isNotification, setIsNotification] = useState<boolean | null>(null);

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
                    <Text fontSize="3xl" fontWeight="bold">
                        Intereses
                    </Text>

                    <VStack align="start" spacing="16px">
                        <Text fontSize="2xl" fontFamily="inter" lineHeight="32px">
                            ¿Te gustaría recibir correos cada dos semanas con proyectos relacionados a tus intereses en
                            áreas de alto impacto?
                        </Text>
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

                    <HStack spacing="16px" w="full">
                        <Button
                            variant="solid"
                            h="40px"
                            w="full"
                            bg={isNotification ? 'teal.800' : 'gray.600'}
                            _hover={{ bg: isNotification ? 'teal.700' : 'teal.600' }}
                            onClick={() => setIsNotification(true)}
                        >
                            Sí, deseo recibir correos
                        </Button>
                        <Button
                            variant="solid"
                            h="40px"
                            w="full"
                            bg={!isNotification ? 'teal.800' : 'gray.600'}
                            _hover={{ bg: !isNotification ? 'teal.700' : 'teal.600' }}
                            onClick={() => setIsNotification(false)}
                        >
                            No por ahora
                        </Button>
                    </HStack>
                </VStack>

                <Button
                    type="button"
                    w="full"
                    variant="solid"
                    h="40px"
                    onClick={() => {
                        isNotification ? setPage(4) : setStepStatus('DisabledNotification');
                    }}
                >
                    Continuar
                </Button>
            </VStack>

            <OnboardingModal isOpen={isOpenOnboarding} onClose={closeOnboarding} />
        </>
    );
};

export default NotificationExperience;
