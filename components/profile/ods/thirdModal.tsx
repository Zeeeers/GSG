//@ts-nocheck
import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useCheckboxGroup,
    useToast,
    VStack,
    WrapItem,
} from '@chakra-ui/react';
import CheckCard from 'common/checkCard';
import ThirdParties from 'components/projectDetail/formatText/thirdParties';
import React, { useEffect, useState } from 'react';
import { useUser } from 'services/api/lib/user';
import { Interest } from 'services/api/types/Interest';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    interest?: Interest;
    myInterest: Interest;
    reload?: () => void;
}

const ThirdModal: React.FC<Props> = ({ isOpen, onClose, interest, myInterest, reload }) => {
    const [third, setThird] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { getCheckboxProps, setValue } = useCheckboxGroup({
        defaultValue: third,
        // @ts-ignore
        onChange: (value) => setThird(value),
    });

    const { data: user } = useUser();

    const toast = useToast();

    const handleSave = async () => {
        setIsLoading(true);
        const { update } = await import('../../../services/api/lib/interest');

        const data = {
            interest: {
                third_party: third?.join(';;'),
            },
        };

        const { ok } = await update({ id: myInterest?.id, data });

        if (ok) {
            setIsLoading(false);
            reload();
            toast({
                //@ts-ignore
                title: 'Respaldo guardado con éxito.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            onClose();
        } else {
            setIsLoading(false);
            toast({
                //@ts-ignore
                title: 'Ha ocurrido un error al guardar los respaldos.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    useEffect(() => {
        if (myInterest?.third_party) {
            setValue(myInterest && myInterest?.third_party.split(';;'));
        }
    }, [myInterest]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="60px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="30px" w="full">
                        <VStack alignItems="flex-start" spacing="10px">
                            <Heading fontFamily="barlow" fontSize="24px" textTransform="uppercase">
                                RESPALDO DE UNA TERCERA ORGANIZACIÓN
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Selecciona las certificaciones que consideres necesarias para recibir correos con
                                recomendaciones de proyectos asociados a esta categoría.
                            </Text>
                        </VStack>

                        <VStack w="full">
                            {interest?.third_party.map((item, index) => (
                                <VStack key={index} w="full" borderBottom="1px" borderBottomColor="gray.500" pb="10px">
                                    <CheckCard
                                        w="full"
                                        width="full"
                                        key={`${index}-explorerFilter`}
                                        as={WrapItem}
                                        v
                                        value={item}
                                        cursor="pointer"
                                        px={'16px'}
                                        py={'8px'}
                                        rounded="8px"
                                        bg="gray.700"
                                        textColor="white"
                                        fontWeight="normal"
                                        fontFamily="inter"
                                        fontSize="md"
                                        _hover={{ bg: 'gray.600' }}
                                        _checked={{ bg: 'teal.500', textColor: 'white', _hover: { bg: 'teal.600' } }}
                                        {...getCheckboxProps({ value: item })}
                                    >
                                        <Text>{ThirdParties(item)}</Text>
                                    </CheckCard>
                                </VStack>
                            ))}
                        </VStack>

                        <Button
                            onClick={handleSave}
                            isLoading={isLoading}
                            loadingText="Guardando respaldo"
                            w="full"
                            h="40px"
                            variant="solid"
                        >
                            Guardar
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ThirdModal;
