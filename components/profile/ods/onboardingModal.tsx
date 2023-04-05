import { Heading, Image, Modal, ModalBody, ModalContent, ModalOverlay, VStack } from '@chakra-ui/react';

import React from 'react';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

const OnboardingModal: React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="60px">
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="30px" w="full">
                        <Heading fontFamily="barlow" fontSize="30px" lineHeight="36px" textTransform="uppercase">
                            Correo ejemplo
                        </Heading>

                        <Image src="/images/preview-email.png" alt="preview-ods" w="full" h="full" />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default OnboardingModal;
