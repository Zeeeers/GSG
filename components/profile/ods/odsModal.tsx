import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Stack,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Select } from 'chakra-react-select';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

const OdsModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" p="50px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="15px" w="full">
                        <Heading fontFamily="inter" fontSize="16px" lineHeight="24px">
                            Selecciona los ODS de tu interés
                        </Heading>
                        <Stack w="full">
                            <Select placeholder="Seleccionar" options={options} useBasicStyles />
                        </Stack>
                        <Button w="full" h="40px" variant="solid">
                            Guardar cambios
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default OdsModal;
