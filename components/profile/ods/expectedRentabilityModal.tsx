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
import Rentability from 'components/projectDetail/formatText/rentability';
import React, { useState } from 'react';
import { Interest } from 'services/api/types/Interest';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    interest?: Interest;
    myInterest: Interest;
}

const ExpectedRentabilityModal: React.FC<Props> = ({ isOpen, onClose, interest, myInterest }) => {
    const [rentability, setRentability] = useState('');

    const { getRootProps, getRadioProps } = useRadioGroup({
        defaultValue: '',
        onChange: (value) => setRentability(value),
    });

    const group = getRootProps();

    const toast = useToast();

    const handleSave = async () => {
        const { update } = await import('../../../services/api/lib/interest');

        const data = {
            interest: {
                //@ts-ignore
                expected_rentability: rentability,
            },
        };

        //@ts-ignore
        const { ok } = await update({ id: myInterest?.interests?.id, data });

        if (ok) {
            toast({
                //@ts-ignore
                title: 'Rentabilidad guardada con éxito.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
            onClose();
        } else {
            toast({
                //@ts-ignore
                title: 'Ha ocurrido un error al guardar la rentabilidad.',
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
                                RENTABILIDAD ESPERADA
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Selecciona una alternativa única para recibir correos con recomendaciones de proyectos
                                asociados a esta categoría.
                            </Text>
                        </VStack>

                        <VStack w="full" {...group}>
                            {interest?.expected_rentability.map((value) => {
                                const radio = getRadioProps({ value });
                                return (
                                    <RadioCard key={value} {...radio}>
                                        {Rentability(value)}
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

export default ExpectedRentabilityModal;
