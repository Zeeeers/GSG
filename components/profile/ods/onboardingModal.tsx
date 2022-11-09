import {
    Button,
    Checkbox,
    Heading,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    handleUpdateOnboarding: (value: boolean) => void;
    handleOnboarding: () => void;
    onboarding: boolean;
}

const OnboardingModal: React.FC<Props> = ({
    isOpen,
    onClose,
    handleUpdateOnboarding,
    onboarding = false,
    handleOnboarding,
}) => {
    const router = useRouter();
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="60px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="30px" w="full">
                        <VStack alignItems="flex-start" spacing="10px">
                            <Heading fontFamily="barlow" fontSize="24px" lineHeight="24px" textTransform="uppercase">
                                Tus intereses están guardados
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Si seleccionaste que deseas recibir correos semanalmente, te comenzaremos a enviar
                                proyectos que tengan afinidad con tus intereses.
                            </Text>
                        </VStack>

                        <Image src="/images/preview-email.png" />

                        <VStack w="full">
                            <Text fontFamily="inter" fontSize="16px" fontWeight="normal" lineHeight="20.8px">
                                Si quieres ver todos los proyectos de GSG NAB Chile, te invitamos a nuestro explorador
                                de proyectos en el siguiente botón.
                            </Text>
                        </VStack>

                        <VStack w="full" align="flex-start" spacing="20px">
                            {onboarding && (
                                <HStack>
                                    <Checkbox />
                                    <Text fontSize="15px" fontFamily="inter">
                                        Quiero que me envíen un correo con un resumen de los intereses que guardé
                                    </Text>
                                </HStack>
                            )}

                            <HStack>
                                <Checkbox onChange={(e) => handleUpdateOnboarding(e.target.checked)} />
                                <Text fontSize="15px" fontFamily="inter">
                                    Lo entiendo, no volver a mostrar
                                </Text>
                            </HStack>

                            <Button
                                w="full"
                                h="40px"
                                variant="solid"
                                onClick={() => {
                                    handleOnboarding();
                                    onboarding
                                        ? router.push({
                                              pathname: '/explorer',
                                              query: { onboarding: 'filter-experience' },
                                          })
                                        : router.push('/explorer');
                                }}
                            >
                                Ir al explorador de proyectos
                            </Button>
                        </VStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default OnboardingModal;
