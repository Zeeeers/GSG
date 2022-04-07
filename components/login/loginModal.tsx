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
                <ModalContent rounded="2xl" pt={'30px'} px="10px">
                    <ModalHeader fontSize="4xl" d="flex" alignItems="center" pb={0}>
                        Ingresar
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={6} pt={0}>
                        <Text fontSize={'md'} fontWeight={'normal'} mt="7px">
                            Comienza a invertir en nuestros proyectos{' '}
                        </Text>
                        <LoginForm />

                        <Flex flexDirection={'column'} alignItems={'center'}>
                            <Link href="/recovery" passHref>
                                <Button
                                    variant="link"
                                    transitionProperty="all"
                                    transitionDuration={'slow'}
                                    colorScheme="primary"
                                >
                                    Olvidé mi contraseña
                                </Button>
                            </Link>
                            <VStack spacing="7px" mt="36px">
                                <Text fontSize={'md'} fontWeight={'semibold'}>
                                    ¿No tienes cuenta?
                                </Text>
                                <Button>Solicitar una invitación</Button>
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
