// Dependencies
import { Modal, ModalContent, ModalHeader, ModalBody, ModalOverlay, ModalCloseButton } from '@chakra-ui/react';

// Types
interface Props {
    isOpen: boolean;
    onClose: () => void;
}

// Component
const TermsModal: React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Términos y condiciones</ModalHeader>
                <ModalCloseButton size="lg" variant="outline" />

                <ModalBody pb={4}>jiji</ModalBody>
            </ModalContent>
        </Modal>
    );
};

// Export
export default TermsModal;
