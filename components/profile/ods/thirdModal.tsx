import {
    Button,
    Checkbox,
    Heading,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Select } from 'chakra-react-select';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

const ThirdModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="60px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="30px" w="full">
                        <VStack alignItems="flex-start" spacing="5px">
                            <Heading fontFamily="barlow" fontSize="24px" lineHeight="24px" textTransform="uppercase">
                                Respaldo de una tercera organización
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                A continuación se presentan las alternativas que podrás elegir para recibir correos con
                                recomendaciones de empresas, productos o servicios asociados a esta categoría
                            </Text>
                        </VStack>

                        <Button w="full" h="40px" variant="solid">
                            Guardar cambios
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ThirdModal;
