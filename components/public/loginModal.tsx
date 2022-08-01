// Dependencies
import { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    Button,
    Flex,
    Text,
    Link as ChakraLink,
} from '@chakra-ui/react';
import LoginForm from 'components/login/loginForm';
import AuthManager from '@clyc/next-route-manager/libs/AuthManager';

// Types
interface Props {
    isOpen: boolean;
    onClose: () => void;
    registerOnOpen: () => void;
    closeModalAfterLogin: boolean;
    onLoginSuccess?: () => void;
}

// Component
const LoginModal: React.FC<Props> = ({ isOpen, onClose, registerOnOpen, closeModalAfterLogin, onLoginSuccess }) => {
    // States
    const { isAuthenticated } = new AuthManager({ cookieName: process.env.NEXT_PUBLIC_PYMES_COOKIE_NAME! });
    const [isLogged, setIsLogged] = useState(isAuthenticated);
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
                <ModalOverlay />
                <ModalContent rounded="2xl">
                    <ModalHeader fontSize="3xl" d="flex" alignItems="center" pb={0}>
                        {!isLogged ? 'Ingresar a Skala' : 'Has ingresado a Skala con éxito'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={6} pt={0}>
                        {!isLogged ? (
                            <>
                                <LoginForm
                                    isPyme
                                    afterLogin={() => {
                                        closeModalAfterLogin ? onClose() : setIsLogged(true);
                                        !!onLoginSuccess && onLoginSuccess();
                                    }}
                                />
                                <Flex flexDir="column" justifyContent="center" alignItems="center" w="full" pt={6}>
                                    <Button
                                        variant="link"
                                        onClick={() => {
                                            registerOnOpen();
                                            onClose();
                                        }}
                                        mb={4}
                                    >
                                        Aún no tengo mi cuenta Skala
                                    </Button>

                                    <ChakraLink
                                        isExternal
                                        fontWeight="semibold"
                                        textColor="secondary.500"
                                        fontSize="md"
                                        _hover={{ textDecor: 'none' }}
                                        href={
                                            process.env.NEXT_PUBLIC_BASE_URL === 'https://dev-desafios.skalachile.com/'
                                                ? 'https://dev.skalachile.com/recovery'
                                                : 'https://skalachile.com/recovery'
                                        }
                                    >
                                        Olvide mi contraseña
                                    </ChakraLink>
                                </Flex>
                            </>
                        ) : (
                            <>
                                <Flex flexDir="column" justifyContent="start" pt={6}>
                                    <Text mb={8}>
                                        Ingresa a tu Dashboard y podrás crear proyectos para postular a desafíos y
                                        realizar cursos de formación para tu empresa o explora la página para ver los
                                        desafíos a los que puedes postular.
                                    </Text>
                                    <ChakraLink
                                        href={
                                            process.env.NEXT_PUBLIC_BASE_URL === 'https://dev-desafios.skalachile.com/'
                                                ? 'https://dev.skalachile.com/login'
                                                : 'https://skalachile.com/login'
                                        }
                                        isExternal
                                        rel="noopener noreferrer"
                                        fontWeight="bold"
                                        _hover={{ textDecor: 'none' }}
                                        w="full"
                                    >
                                        <Button variant="solid" colorScheme="primary" w="full">
                                            Ir al Dashboard
                                        </Button>
                                    </ChakraLink>
                                </Flex>
                            </>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

// Export
export default LoginModal;
