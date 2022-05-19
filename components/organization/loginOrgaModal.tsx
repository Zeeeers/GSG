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
    HStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import LoginOrgaForm from './loginOrgaForm';
import SignupOrgaForm from './signupOrgaForm';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

// Component
const LoginOrgaModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [isRegister, isSetRegister] = useState(false);
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay />
                <ModalContent rounded="2xl" pt={'30px'} px="10px">
                    <ModalHeader fontSize="3xl" d="flex" alignItems="center" pb={0}>
                        {isRegister ? 'REGISTRATE' : 'INICIAR SESIÓN'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={6} pt={0}>
                        <Text fontSize={'md'} fontWeight={'normal'} mt="7px">
                            {isRegister ? (
                                <HStack>
                                    <Text>Crea tu cuenta en Goodbusiness para continuar</Text>
                                    <Button
                                        onClick={() => isSetRegister(false)}
                                        variant={'link'}
                                        alignContent="baseline"
                                    >
                                        Ya tengo cuenta
                                    </Button>
                                </HStack>
                            ) : (
                                'Ingresa a tu cuenta para continuar'
                            )}
                        </Text>

                        {isRegister ? <SignupOrgaForm /> : <LoginOrgaForm isPyme={true} />}

                        {!isRegister && (
                            <Flex flexDirection={'column'} alignItems={'center'} mt="20px">
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
                                        Aún no tengo cuenta
                                    </Text>
                                    <Button
                                        onClick={() => isSetRegister(true)}
                                        variant="outline"
                                        transitionProperty="all"
                                        transitionDuration={'slow'}
                                        colorScheme="secondary"
                                        w="320px"
                                    >
                                        Registrarme
                                    </Button>
                                </VStack>
                            </Flex>
                        )}

                        <VStack mt={isRegister ? '20px' : '70px'} spacing={isRegister ? '2px' : '10px'}>
                            <Text fontSize={'xs'}>powered by</Text>
                            <HStack spacing={0}>
                                <Text fontSize="24px" fontWeight={'bold'} textColor="#20B06B">
                                    Company
                                </Text>
                                <Text fontSize="24px" fontWeight={'extrabold'} textColor="#20B06B">
                                    Pitch
                                </Text>
                            </HStack>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

// Export
export default LoginOrgaModal;
