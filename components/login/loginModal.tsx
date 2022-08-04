// Dependencies
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Button,
    Flex,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import LoginForm from './loginForm';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

// Component
const LoginChooseModal: React.FC<Props> = ({ isOpen, onClose }) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
                <ModalOverlay />
                <ModalContent rounded="2xl" pt={'54px'} px="34px">
                    <ModalHeader fontSize="3xl" d="flex" textAlign="start" px={0} py={0}>
                        Ingresar
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={6} pt={0}>
                        <Text fontSize={'md'} fontWeight={'normal'} mt="7px">
                            Comienza a invertir en nuestros proyectos{' '}
                        </Text>
                        <LoginForm afterLogin={onClose} />

                        <Flex flexDirection={'column'} alignItems={'center'}>
                            <Link href="/recovery/recoveryPassword" passHref>
                                <Button
                                    variant="link"
                                    transitionProperty="all"
                                    transitionDuration={'slow'}
                                    colorScheme="primary"
                                    fontWeight="normal"
                                >
                                    Olvidé mi contraseña
                                </Button>
                            </Link>
                            <VStack spacing="7px" mt="36px">
                                <Text fontSize={'md'} fontWeight={'normal'} fontFamily="inter">
                                    ¿No tienes cuenta?
                                </Text>
                                <Button variant="outline">Solicitar una invitación</Button>
                            </VStack>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

// Export
export default LoginChooseModal;
