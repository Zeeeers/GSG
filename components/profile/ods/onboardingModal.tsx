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
}

const OnboardingModal: React.FC<Props> = ({ isOpen, onClose, handleUpdateOnboarding }) => {
    const router = useRouter();
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay bg="none" backdropFilter="auto" backdropBrightness="40%" backdropBlur="2px" />
            <ModalContent rounded="2xl" px="30px" py="60px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="30px" w="full">
                        <VStack alignItems="flex-start" spacing="10px">
                            <Heading fontFamily="barlow" fontSize="24px" lineHeight="24px" textTransform="uppercase">
                                Tus intereses se han guardado
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Si seleccionaste recibir correos, te comenzaremos a enviar proyectos que tengan afinidad
                                con tus intereses.
                            </Text>
                        </VStack>

                        <Image src="/images/preview-email.jpg" />

                        <VStack w="full">
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Si quieres ver todos los proyectos que han postulado a GSG NAB Chile, te invitamos a
                                explorarlos.
                            </Text>
                        </VStack>

                        <VStack w="full" align="flex-start" spacing="20px">
                            <HStack>
                                <Checkbox onChange={(e) => handleUpdateOnboarding(e.target.checked)} />
                                <Text>Lo entiendo, no volver a mostrar</Text>
                            </HStack>

                            <Button w="full" h="40px" variant="solid" onClick={() => router.push('/explorer')}>
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
