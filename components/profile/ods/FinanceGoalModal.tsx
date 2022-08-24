// @ts-nocheck
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

import FinanceGoal from 'components/projectDetail/formatText/financeGoal';
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

const FinanceGoalModal: React.FC<Props> = ({ isOpen, onClose, interest, myInterest, reload }) => {
    const [finance, setFinance] = useState([]);
    const { getCheckboxProps, setValue } = useCheckboxGroup({
        defaultValue: finance,
        onChange: (value) => setFinance(value),
    });

    const toast = useToast();

    const handleSave = async () => {
        const { update } = await import('../../../services/api/lib/interest');

        const data = {
            interest: {
                //@ts-ignore
                finance_goal: finance.join(';;'),
            },
        };

        //@ts-ignore
        const { ok } = await update({ id: myInterest?.id, data });

        if (ok) {
            reload();
            toast({
                //@ts-ignore
                title: 'Monto de aporte guardada con éxito.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            onClose();
        } else {
            toast({
                //@ts-ignore
                title: 'Ha ocurrido un error al guardar el monto de aporte.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    useEffect(() => {
        if (myInterest?.finance_goal) {
            setValue(myInterest && myInterest?.finance_goal.split(';;'));
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
                                MONTO DE APORTE BUSCADO (CLP)
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Selecciona las opciones de monto de aporte buscado que consideres necesarias para
                                recibir correos con recomendaciones de proyectos asociados a esta categoría.
                            </Text>
                        </VStack>

                        <VStack w="full" overflowY="auto" h="330px" className="custom-scroll-light">
                            {interest?.finance_goal.map((item, index) => (
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
                                        <Text>{FinanceGoal(item)}</Text>
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

export default FinanceGoalModal;
