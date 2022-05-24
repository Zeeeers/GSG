import {
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Gsg } from 'services/api/types/Gsg';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    project: Gsg | undefined;
}

const ContactModal: React.FC<Props> = ({ isOpen, onClose, project }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" pt={'30px'} px="10px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="20px">
                        <Heading fontSize="30px" lineHeight="32px">
                            CONTACTO DE {project?.title.toUpperCase()}
                        </Heading>
                        <VStack alignItems="flex-start" spacing={0}>
                            <Text fontSize="20px" fontWeight="semibold">
                                Correo
                            </Text>
                            <Text fontSize="16px" fontFamily="inter">
                                Contacto@northstargroup.com
                            </Text>
                        </VStack>
                        <VStack alignItems="flex-start" spacing={0}>
                            <Text fontSize="20px" fontWeight="semibold">
                                Teléfono
                            </Text>
                            <Text fontSize="16px" fontFamily="inter">
                                +569 0000 0000
                            </Text>
                        </VStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ContactModal;
