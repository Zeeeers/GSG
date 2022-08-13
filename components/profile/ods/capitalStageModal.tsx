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
    useRadioGroup,
    useToast,
    VStack,
    WrapItem,
} from '@chakra-ui/react';
import CheckCard from 'common/checkCard';
import RadioCard from 'common/checkCardBox';
import Stage from 'components/projectDetail/formatText/stage';
import React, { useEffect, useState } from 'react';
import { Interest } from 'services/api/types/Interest';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    interest?: Interest;
    myInterest: Interest;
}

const CapitalStageModal: React.FC<Props> = ({ isOpen, onClose, interest, myInterest }) => {
    const [stageCapital, setStageCapital] = useState([]);

    const { getCheckboxProps, setValue } = useCheckboxGroup({
        defaultValue: stageCapital,
        onChange: (value) => setStageCapital(value),
    });

    const toast = useToast();

    const handleSave = async () => {
        const { update } = await import('../../../services/api/lib/interest');

        const data = {
            interest: {
                //@ts-ignore
                capital_stage: stageCapital.join(';;'),
            },
        };

        const { ok } = await update({ id: myInterest.id, data });

        if (ok) {
            toast({
                //@ts-ignore
                title: 'Etapa de levantamiento guardado con éxito.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            onClose();
        } else {
            toast({
                //@ts-ignore
                title: 'Ha ocurrido un error al guardar la etapa de levantamiento.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    useEffect(() => {
        if (myInterest?.capital_stage) {
            setValue(myInterest && myInterest?.capital_stage.split(';;'));
        }
    }, [myInterest]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="60px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="30px" w="full">
                        <VStack alignItems="flex-start" spacing="5px">
                            <Heading fontFamily="barlow" fontSize="24px" lineHeight="24px" textTransform="uppercase">
                                TIPO DE FINANCIAMIENTO
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Selecciona una alternativa única para recibir correos con recomendaciones de proyectos
                                asociados a esta categoría.
                            </Text>
                        </VStack>

                        <VStack w="full" overflowY="auto" h="330px">
                            {interest?.capital_stage.map((item, index) => (
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
                                    <Text>{Stage(item)}</Text>
                                </CheckCard>
                            ))}
                        </VStack>

                        <Button w="full" h="40px" variant="solid" onClick={handleSave}>
                            Guardar cambios
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default CapitalStageModal;
