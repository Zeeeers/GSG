//@ts-nocheck
import {
    Button,
    Heading,
    HStack,
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
import CheckCardBox from 'common/checkCardBox';
import Stage from 'components/projectDetail/formatText/stage';
import StageCapital from 'components/projectDetail/formatText/stageCapital';
import React, { useEffect, useState } from 'react';
import { useUser } from 'services/api/lib/user';
import { Interest } from 'services/api/types/Interest';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    interest?: Interest;
    myInterest: Interest;
}

const StageModal: React.FC<Props> = ({ isOpen, onClose, interest, myInterest }) => {
    const [stage, setStage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { getRootProps, getRadioProps, setValue } = useRadioGroup({
        defaultValue: '',
        onChange: (value) => setStage(value),
    });

    const group = getRootProps();
    const toast = useToast();

    const handleSave = async () => {
        setIsLoading(true);
        const { update } = await import('../../../services/api/lib/interest');

        const data = {
            interest: {
                //@ts-ignore
                stage: stage,
            },
        };

        const { ok } = await update({ id: myInterest?.id, data });

        if (ok) {
            setIsLoading(false);
            toast({
                //@ts-ignore
                title: 'Etapa guardado con éxito.',
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
                title: 'Ha ocurrido un error al guardar la etapa.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    useEffect(() => {
        if (myInterest?.stage) {
            setValue(myInterest && myInterest?.stage);
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
                            <Heading fontFamily="barlow" fontSize="24px" lineHeight="130%" textTransform="uppercase">
                                ETAPA DE PROYECTO
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Selecciona una alternativa única para recibir correos con recomendaciones de proyectos
                                asociados a esta categoría.
                            </Text>
                        </VStack>

                        <VStack w="full" {...group}>
                            {interest?.stage.map((value) => {
                                const radio = getRadioProps({ value });
                                return (
                                    <RadioCard key={value} {...radio}>
                                        {StageCapital(value)}
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

export default StageModal;
