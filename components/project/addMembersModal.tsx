import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useCreateGsgProjectStore } from 'stores/createGsgProject';
import AddMembersForm from './addMembersForm';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

const AddMembersModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const clearMember = useCreateGsgProjectStore((s) => s.clearMember);
    if (!isOpen) {
        clearMember();
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
            <ModalOverlay />
            <ModalContent rounded="2xl" pt={'30px'} px="10px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="20px">
                        <AddMembersForm />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AddMembersModal;
