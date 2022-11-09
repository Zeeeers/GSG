import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    VStack,
    Text,
    Button,
    HStack,
    Stack,
    Img,
} from '@chakra-ui/react';
import Router from 'next/router';
import { useState } from 'react';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
}

const FilterExperienceModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [indexPage, setIndexPage] = useState(0);

    const welcome = (
        <VStack align="center">
            <Img
                src="https://skala-chile.s3.us-east-2.amazonaws.com/production/match_logo_V.2.png"
                w="213px"
                h="56px"
            />
            <Text
                textAlign="center"
                fontSize="30px"
                fontWeight="bold"
                textTransform="uppercase"
                lineHeight="32px"
                pt="40px"
                pb="10px"
            >
                Te damos la bienvenida a match
            </Text>
            <Text fontSize="16px" fontFamily="inter" textAlign="center">
                Descubre y encuentra oportunidades para conectar con proyectos de alto impacto
            </Text>
        </VStack>
    );

    const explorer = (
        <VStack align="center">
            <Stack background="gray.600" p="15px" rounded="12px">
                <Img src="/images/icons/explorer.svg" />
            </Stack>
            <VStack align="flex-start">
                <Text
                    textAlign="start"
                    fontSize="30px"
                    fontWeight="bold"
                    textTransform="uppercase"
                    pt="40px"
                    lineHeight="32px"
                >
                    Explora proyectos
                </Text>
                <Text fontSize="16px" fontFamily="inter">
                    A través del explorador podrás conocer todos los proyectos disponibles dentro de Match. Serás capaz
                    de filtrarlos de acuerdo a como lo requieras
                </Text>
            </VStack>
        </VStack>
    );

    const review = (
        <VStack align="center">
            <Stack background="gray.600" p="15px" rounded="12px">
                <Img src="/images/icons/pharap.svg" />
            </Stack>
            <VStack align="flex-start">
                <Text fontSize="30px" fontWeight="bold" textTransform="uppercase" pt="40px" lineHeight="32px">
                    Revisa los proyectos en detalle
                </Text>
                <Text fontSize="16px" fontFamily="inter">
                    Conoce el status del proyecto, el impacto que buscan realizar, su descripción financiera, equipo,
                    entre otros elementos relevantes
                </Text>
            </VStack>
        </VStack>
    );

    const contact = (
        <VStack align="center">
            <Stack background="gray.600" p="15px" rounded="12px">
                <Img src="/images/icons/contact.svg" />
            </Stack>
            <VStack align="flex-start">
                <Text fontSize="30px" fontWeight="bold" textTransform="uppercase" pt="40px">
                    Contacta
                </Text>
                <Text fontSize="16px" fontFamily="inter">
                    Si el proyecto ha llamado tu atención y quieres profundizar en él, o ves una oportunidad de
                    inversión, tendrás los datos de contacto para realizarlo.
                </Text>
            </VStack>
        </VStack>
    );

    const page = [welcome, explorer, review, contact];
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => Router.replace({ pathname: '/explorer' }).then(() => onClose())}
            isCentered
            size="lg"
        >
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="40px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" w="full" spacing="30px">
                        {page[indexPage]}

                        <HStack w="full" justify="space-between">
                            {indexPage === 0 && (
                                <Button
                                    onClick={() => Router.replace({ pathname: '/explorer' }).then(() => onClose())}
                                    variant="ghost"
                                    h="40px"
                                    color="gray.50"
                                    fontFamily="inter"
                                    fontSize="16px"
                                >
                                    Saltar
                                </Button>
                            )}

                            <Button
                                onClick={() =>
                                    indexPage === 3
                                        ? Router.replace({ pathname: '/explorer' }).then(() => onClose())
                                        : setIndexPage(indexPage + 1)
                                }
                                fontFamily="inter"
                                fontSize="16px"
                                variant="solid"
                                h="40px"
                                px="30px"
                            >
                                {indexPage === 0 ? 'Iniciar' : indexPage === 3 ? 'Finalizar' : 'Siguiente'}
                            </Button>
                        </HStack>

                        <HStack w="full" justify="center" spacing="5px">
                            <Stack
                                w="10px"
                                h="10px"
                                rounded="full"
                                background={indexPage === 0 ? 'teal.500' : 'gray.50'}
                            ></Stack>
                            <Stack
                                w="10px"
                                h="10px"
                                rounded="full"
                                background={indexPage === 1 ? 'teal.500' : 'gray.50'}
                            ></Stack>
                            <Stack
                                w="10px"
                                h="10px"
                                rounded="full"
                                background={indexPage === 2 ? 'teal.500' : 'gray.50'}
                            ></Stack>
                            <Stack
                                w="10px"
                                h="10px"
                                rounded="full"
                                background={indexPage === 3 ? 'teal.500' : 'gray.50'}
                            ></Stack>
                        </HStack>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default FilterExperienceModal;
