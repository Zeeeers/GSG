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
            <ModalContent p="25px">
                <ModalHeader textAlign="start" pl={0}>
                    Términos y condiciones
                </ModalHeader>
                <ModalCloseButton size="lg" variant="outline" />

                <ModalBody pb={4}>
                    Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha
                    sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T.
                    persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal
                    manera que logró hacer un libro de textos especimen.
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

// Export
export default TermsModal;
