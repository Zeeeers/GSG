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
import RegisterStepForm from 'components/register/registerStepForm';
import Link from 'next/link';
import React, { useState } from 'react';
import LoginOrgaForm from './loginOrgaForm';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

// Component
const LoginOrgaModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [isRegister, isSetRegister] = useState(false);
    const btnRef = React.useRef(null);
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                finalFocusRef={btnRef}
                isCentered
                size="md"
                scrollBehavior="outside"
            >
                <ModalOverlay />
                <ModalContent top={30} rounded="2xl" pt={'30px'} px="30px">
                    <ModalHeader fontSize="3xl" d="flex" alignItems="flex-start" textAlign="start" pl={0} pb={0}>
                        {isRegister ? 'REGISTRATE' : 'INICIAR SESIÓN'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody maxW="400px" mb={6} pt={0}>
                        <Text fontSize={'md'} fontWeight={'normal'} mt="7px">
                            {isRegister
                                ? 'Crea tu cuenta en Goodbusiness para continuar'
                                : 'Ingresa a tu cuenta para continuar'}
                        </Text>

                        {isRegister ? <RegisterStepForm /> : <LoginOrgaForm afterLogin={onClose} />}

                        {!isRegister ? (
                            <Flex flexDirection={'column'} alignItems={'center'} mt="20px">
                                <Link href="/recovery" passHref>
                                    <Button
                                        variant="link"
                                        transitionProperty="all"
                                        transitionDuration={'slow'}
                                        colorScheme="primary"
                                        fontWeight={'normal'}
                                    >
                                        Olvidé mi contraseña
                                    </Button>
                                </Link>
                                <VStack spacing="7px" mt="36px">
                                    <Text fontSize={'md'} fontWeight={'normal'}>
                                        Aún no tengo cuenta
                                    </Text>
                                    <Button
                                        onClick={() => isSetRegister(true)}
                                        variant="outline"
                                        transitionProperty="all"
                                        transitionDuration={'slow'}
                                        colorScheme="secondary"
                                        w="320px"
                                        fontWeight={'normal'}
                                    >
                                        Registrarme
                                    </Button>
                                </VStack>
                            </Flex>
                        ) : (
                            <Button
                                type="button"
                                w="full"
                                variant="ghost"
                                mt="20px"
                                onClick={() => isSetRegister(false)}
                            >
                                Ya tengo cuenta
                            </Button>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

// Export
export default LoginOrgaModal;
