import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useRadioGroup,
    useToast,
    VStack,
} from '@chakra-ui/react';

import RadioCard from 'common/checkCardBox';
import FinanceGoal from 'components/projectDetail/formatText/financeGoal';
import React, { useState } from 'react';
import { Interest } from 'services/api/types/Interest';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    interest?: Interest;
    myInterest: Interest;
}

const FinanceGoalModal: React.FC<Props> = ({ isOpen, onClose, interest, myInterest }) => {
    const [finance, setFinance] = useState('');
    const { getRootProps, getRadioProps } = useRadioGroup({
        defaultValue: '',
        onChange: (value) => setFinance(value),
    });

    const group = getRootProps();

    const toast = useToast();

    const handleSave = async () => {
        const { update } = await import('../../../services/api/lib/interest');

        const data = {
            interest: {
                //@ts-ignore
                finance_goal: finance,
            },
        };

        //@ts-ignore
        const { ok } = await update({ id: myInterest?.interests?.id, data });

        if (ok) {
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

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="60px">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="30px" w="full">
                        <VStack alignItems="flex-start" spacing="5px">
                            <Heading fontFamily="barlow" fontSize="24px" lineHeight="24px" textTransform="uppercase">
                                MONTO DE APORTE BUSCADO
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Selecciona una alternativa única para recibir correos con recomendaciones de proyectos
                                asociados a esta categoría.
                            </Text>
                        </VStack>

                        <VStack w="full" {...group}>
                            {interest?.finance_goal.map((value) => {
                                const radio = getRadioProps({ value });
                                return (
                                    <RadioCard key={value} {...radio}>
                                        {FinanceGoal(value)}
                                    </RadioCard>
                                );
                            })}
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

export default FinanceGoalModal;
