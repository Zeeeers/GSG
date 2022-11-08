//@ts-nocheck
import {
    Button,
    Heading,
    HStack,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Tooltip,
    useToast,
    VStack,
    Icon,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { OrganizationFormat } from 'services/api/types/Organization';
import { BsFiles, BsFilesAlt, BsFileSlides } from 'react-icons/bs';
import { IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin, IoLogoYoutube } from 'react-icons/io';
import { AiOutlineGlobal } from 'react-icons/ai';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    project: OrganizationFormat | undefined;
    web: string;
}

const ContactModal: React.FC<Props> = ({ isOpen, onClose, project, web }) => {
    const toast = useToast();
    const [copyEmail, setCopyEmail] = useState({
        value: '',
        copied: false,
    });

    console.log(web);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" p="50px" bg="gray.800">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="20px">
                        <Heading fontSize="30px" lineHeight="32px" textTransform="uppercase">
                            CONTACTO DE {project?.name}
                        </Heading>
                        <HStack w="full" align="center" justify="space-between">
                            <VStack alignItems="flex-start" spacing={0}>
                                <Text fontSize="16px" color="gray.400">
                                    Correo
                                </Text>
                                <Text fontSize="24px" fontFamily="inter">
                                    {project?.legal_representative_email ?? 'No hay correo'}
                                </Text>
                            </VStack>

                            <Tooltip hasArrow label="Copiar correo" bg="gray.700" placement="top">
                                <Button
                                    onClick={() =>
                                        navigator.clipboard.writeText(project?.legal_representative_email).then((e) =>
                                            toast({
                                                title: 'Correo guardado en portapapeles.',
                                                status: 'success',
                                                duration: 1000,
                                                isClosable: true,
                                                position: 'top-right',
                                            }),
                                        )
                                    }
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
                        <HStack w="full" align="center" justify="space-between">
                            <VStack alignItems="flex-start" spacing={0}>
                                <Text fontSize="16px" color="gray.400">
                                    Teléfono
                                </Text>
                                <Text fontSize="24px" fontFamily="inter">
                                    +569 {project?.legal_representative_phone}
                                </Text>
                            </VStack>

                            <Tooltip hasArrow label="Copiar teléfono" bg="gray.700" placement="bottom">
                                <Button
                                    onClick={() =>
                                        navigator.clipboard
                                            .writeText(`+569${project?.legal_representative_phone}`)
                                            .then(() =>
                                                toast({
                                                    title: 'Teléfono guardado en portapapeles.',
                                                    status: 'success',
                                                    duration: 1000,
                                                    isClosable: true,
                                                    position: 'top-right',
                                                }),
                                            )
                                    }
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

                        <VStack alignItems="flex-start" spacing={0}>
                            <Text fontSize="16px" color="gray.400">
                                Plataformas y/o redes sociales{' '}
                            </Text>
                            <Wrap spacingX="20px" spacingY="10px">
                                {web?.map((e, index) => {
                                    if (index === 0) {
                                        return (
                                            <WrapItem>
                                                <Link href={e} target="_blank">
                                                    <Button
                                                        mt="16px"
                                                        display="flex"
                                                        alignItems="center"
                                                        fontSize="16px"
                                                        fontFamily="inter"
                                                        leftIcon={<Icon as={IoLogoLinkedin} w="30px" h="30px" />}
                                                    >
                                                        Linkendin
                                                    </Button>
                                                </Link>
                                            </WrapItem>
                                        );
                                    }

                                    if (index === 1) {
                                        return (
                                            <WrapItem>
                                                <Link href={e} target="_blank">
                                                    <Button
                                                        mt="16px"
                                                        display="flex"
                                                        alignItems="center"
                                                        fontSize="16px"
                                                        fontFamily="inter"
                                                        leftIcon={<Icon as={IoLogoInstagram} w="30px" h="30px" />}
                                                    >
                                                        Instagram
                                                    </Button>
                                                </Link>
                                            </WrapItem>
                                        );
                                    }

                                    if (index === 2) {
                                        return (
                                            <WrapItem>
                                                <Link href={e} target="_blank">
                                                    <Button
                                                        mt="16px"
                                                        display="flex"
                                                        alignItems="center"
                                                        fontSize="16px"
                                                        fontFamily="inter"
                                                        leftIcon={<Icon as={IoLogoFacebook} w="30px" h="30px" />}
                                                    >
                                                        Facebook
                                                    </Button>
                                                </Link>
                                            </WrapItem>
                                        );
                                    }

                                    if (index === 3) {
                                        return (
                                            <WrapItem>
                                                <Link href={e} target="_blank">
                                                    <Button
                                                        mt="16px"
                                                        display="flex"
                                                        alignItems="center"
                                                        fontSize="16px"
                                                        fontFamily="inter"
                                                        leftIcon={<Icon as={IoLogoYoutube} w="30px" h="30px" />}
                                                    >
                                                        Youtube
                                                    </Button>
                                                </Link>
                                            </WrapItem>
                                        );
                                    }

                                    if (index === 4) {
                                        return (
                                            <WrapItem>
                                                <Link href={e} target="_blank">
                                                    <Button
                                                        mt="16px"
                                                        display="flex"
                                                        alignItems="center"
                                                        fontSize="16px"
                                                        fontFamily="inter"
                                                        leftIcon={<Icon as={AiOutlineGlobal} w="30px" h="30px" />}
                                                    >
                                                        Sitio Web
                                                    </Button>
                                                </Link>
                                            </WrapItem>
                                        );
                                    }
                                })}
                            </Wrap>
                        </VStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ContactModal;
