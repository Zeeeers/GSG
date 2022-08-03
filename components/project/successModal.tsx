import { Button, Image, Link, Modal, ModalBody, ModalContent, ModalOverlay, Text, VStack } from '@chakra-ui/react';
import React from 'react';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

const SuccessModal: React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent bg="gray.800" rounded="2xl" py={'30px'} px="30px">
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="center" spacing="30px">
                        <VStack spacing="5px">
                            <Image src="/images/icons/check.svg" />
                            <Text fontSize="3xl" fontWeight="medium">
                                ¡Proyecto postulado con éxito!
                            </Text>
                            <Text textAlign="center" fontSize="16px">
                                Revisaremos tu proyecto, si esta todo en orden será publicado, esto puede tardar un
                                tiempo.
                            </Text>
                        </VStack>
                        <Link href="/explorer">
                            <Button variant="solid">Entendido</Button>
                        </Link>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default SuccessModal;
