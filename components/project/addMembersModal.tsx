import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, VStack } from '@chakra-ui/react';
import React from 'react';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';
import AddMembersForm from './addMembersForm';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    reload: () => void;
}

const AddMembersModal: React.FC<Props> = ({ isOpen, onClose, reload }) => {
    const clearMember = useCreateGsgProjectStore((s) => s.clearMember);
    if (!isOpen) {
        clearMember();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
            <ModalOverlay />
            <ModalContent rounded="2xl" py={'30px'} px="30px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="20px">
                        <AddMembersForm reload={reload} />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AddMembersModal;
