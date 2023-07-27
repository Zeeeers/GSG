import { HStack, Link } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Text,
    Heading,
    OrderedList,
    ListItem,
    VStack,
    Input,
    Button,
    Tooltip,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsFiles } from 'react-icons/bs';

// Types
interface EmailCopyModalProps {
    isOpen: boolean;
    onClose(): void;
}

const EmailCopyModal = ({ isOpen, onClose }: EmailCopyModalProps) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                setIsActive(false);
                onClose();
            }}
            isCentered
        >
            <ModalOverlay />
            <ModalContent rounded="16px" maxW="460px">
                <ModalBody px="36px" py="48px">
                    <VStack spacing="16px" align="start">
                        <Heading fontSize="30px" lineHeight="120%" textTransform="uppercase">
                            Actualizar mi proyecto
                        </Heading>
                        <Text fontSize="16px" fontFamily="inter" lineHeight="140%" color="gray.50">
                            Para actualizar tu proyecto deberás escribirnos a nuestro correo realizando la solicitud,
                            puedes elegir entre las siguientes opciones para hacerlo:
                        </Text>
                        <VStack p={0}>
                            <OrderedList
                                fontSize="16px"
                                fontFamily="inter"
                                lineHeight="140%"
                                color="gray.50"
                                spacing="16px"
                                stylePosition="outside"
                            >
                                <ListItem>
                                    <Link
                                        textDecoration="underline"
                                        href="mailto:contacto@gsg-match.com?Subject=Solicitud%20modificación%20del%20proyecto"
                                    >
                                        Enviar correo ahora
                                    </Link>
                                    , se te redireccionará a tu correo con un mensaje predeterminado.
                                </ListItem>
                                <ListItem>Copiar el correo y redactar mensaje</ListItem>
                            </OrderedList>

                            <HStack pos="relative" w="full">
                                <Input
                                    h="56px"
                                    px="12px"
                                    bg="gray.800"
                                    border="none"
                                    color="gray.50"
                                    fontSize="21px"
                                    lineHeight="152%"
                                    value="Contacto@gsg-match.com"
                                    isReadOnly
                                    _hover={{ bg: 'gray.800' }}
                                    _focus={{ bg: 'gray.800' }}
                                />
                                <Tooltip
                                    hasArrow
                                    label="Correo Copiado"
                                    bg="teal.500"
                                    placement="top"
                                    shadow="lg"
                                    isOpen={isActive}
                                >
                                    <Button
                                        onClick={() =>
                                            navigator.clipboard
                                                .writeText('contacto@gsg-match.com')
                                                .then(() => setIsActive(true))
                                        }
                                        pos="absolute"
                                        right="10px"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        bg="gray.700"
                                        w="36px"
                                        h="40px"
                                        _hover={{ bg: 'gray.600' }}
                                    >
                                        <BsFiles />
                                    </Button>
                                </Tooltip>
                            </HStack>
                        </VStack>
                        <Text fontSize="16px" fontFamily="inter" lineHeight="140%" color="gray.50">
                            Recuerda siempre mencionar el nombre de tu empresa y proyecto que quieres modificar.
                        </Text>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EmailCopyModal;
