// Dependencies
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Button,
    Heading,
    useDisclosure,
    Flex,
    ModalBody,
    ModalCloseButton,
    Stack,
    VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic
const RegisterModal = dynamic(() => import('components/public/registerModal'));
const LoginModal = dynamic(() => import('components/public/loginModal'));

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

// Component
const LoginChooseModal: React.FC<Props> = ({ isOpen, onClose }) => {
    // States
    const { isOpen: registerIsOpen, onOpen: registerOnOpen, onClose: registerOnClose } = useDisclosure();
    const { isOpen: loginIsOpen, onOpen: loginOnOpen, onClose: loginOnClose } = useDisclosure();
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Ingresa</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={6} w="full" mb={6}>
                            <VStack w="full" spacing={3} justifyContent="space-between">
                                <Heading textAlign="center" fontSize="lg">
                                    Quiero resolver desafíos e importantes problemas de innovación.
                                </Heading>
                                <Flex w="full" px={6}>
                                    <Button w="full" variant="solid" colorScheme="secondary" onClick={loginOnOpen}>
                                        Emprendedor
                                    </Button>
                                </Flex>
                            </VStack>
                            <VStack w="full" spacing={3} justifyContent="space-between">
                                <Heading textAlign="center" fontSize="lg">
                                    Tengo desafíos de innovación por resolver.
                                </Heading>
                                <Flex w="full" px={6}>
                                    <Link href="/login" passHref>
                                        <Button w="full" variant="solid" colorScheme="primary">
                                            Convocante
                                        </Button>
                                    </Link>
                                </Flex>
                            </VStack>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {registerIsOpen ? <RegisterModal isOpen={registerIsOpen} onClose={registerOnClose} /> : <></>}
            {loginIsOpen ? (
                <LoginModal
                    isOpen={loginIsOpen}
                    onClose={loginOnClose}
                    registerOnOpen={registerOnOpen}
                    closeModalAfterLogin={false}
                />
            ) : (
                <></>
            )}
        </>
    );
};

// Export
export default LoginChooseModal;
