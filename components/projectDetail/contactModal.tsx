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
import { OrganizationFormat } from 'services/api/types/Organization';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    project: OrganizationFormat | undefined;
    web: string;
}

const ContactModal: React.FC<Props> = ({ isOpen, onClose, project }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" p="50px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="20px">
                        <Heading fontSize="30px" lineHeight="32px" textTransform="uppercase">
                            CONTACTO DE {project?.name}
                        </Heading>
                        <VStack alignItems="flex-start" spacing={0}>
                            <Text fontSize="20px" fontWeight="semibold">
                                Correo
                            </Text>
                            <Text fontSize="16px" fontFamily="inter"></Text>
                        </VStack>
                        <VStack alignItems="flex-start" spacing={0}>
                            <Text fontSize="20px" fontWeight="semibold">
                                Teléfono
                            </Text>
                            <Text fontSize="16px" fontFamily="inter">
                                +569 {project?.legal_representative_phone}
                            </Text>
                        </VStack>

                        <Text fontSize="20px" textDecoration="underline" fontWeight="semibold">
                            Sitio web
                        </Text>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ContactModal;
