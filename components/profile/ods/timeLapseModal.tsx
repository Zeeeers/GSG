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

import Time from 'components/projectDetail/formatText/time';
import React, { useEffect, useState } from 'react';
import { Interest } from 'services/api/types/Interest';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    interest?: Interest;
    myInterest: Interest;
    reload?: () => void;
}

const TimeLapseModal: React.FC<Props> = ({ isOpen, onClose, interest, myInterest, reload }) => {
    const [time, setTime] = useState([]);

    const { getCheckboxProps, setValue } = useCheckboxGroup({
        defaultValue: time,
        onChange: (value) => setTime(value),
    });

    const toast = useToast();

    const handleSave = async () => {
        const { update } = await import('../../../services/api/lib/interest');

        const data = {
            interest: {
                //@ts-ignore
                time_lapse: time.join(';;'),
            },
        };

        //@ts-ignore
        const { ok } = await update({ id: myInterest?.id, data });

        if (ok) {
            reload();
            toast({
                //@ts-ignore
                title: 'Plazo de inversión guardada con éxito.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            onClose();
        } else {
            toast({
                //@ts-ignore
                title: 'Ha ocurrido un error al guardar el plazo de inversión.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    useEffect(() => {
        if (myInterest?.time_lapse) {
            setValue(myInterest && myInterest?.time_lapse.split(';;'));
        }
    }, [myInterest]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl" blockScrollOnMount={true} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="60px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="30px" w="full">
                        <VStack alignItems="flex-start" spacing="5px">
                            <Heading fontFamily="barlow" fontSize="24px" lineHeight="24px" textTransform="uppercase">
                                PLAZOS DE INVERSIÓN
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Selecciona los plazos de inversión para recibir correos con recomendaciones de proyectos
                                asociados a esta categoría.
                            </Text>
                        </VStack>

                        <VStack w="full" overflowY="auto" h="330px">
                            {interest?.time_lapse.map((item, index) => (
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
                                        _hover={{ bg: { base: 'transparent', md: 'gray.600' } }}
                                        _checked={{ bg: 'gray.600', textColor: 'white', _hover: { bg: 'gray.500' } }}
                                        {...getCheckboxProps({ value: item })}
                                    >
                                        <Text>{Time(item)}</Text>
                                    </CheckCard>
                                </VStack>
                            ))}
                        </VStack>

                        <Button w="full" h="40px" variant="solid" onClick={handleSave}>
                            Guardar
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default TimeLapseModal;
