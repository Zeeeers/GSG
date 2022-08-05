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
import CheckCardBox from 'common/checkCardBox';
import StageCapital from 'components/projectDetail/formatText/stageCapital';
import React, { useState } from 'react';
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
    const { getCheckboxProps } = useCheckboxGroup({
        defaultValue: [],
        // @ts-ignore
        onChange: (value) => setStage(value),
    });

    const { data: user } = useUser();

    const toast = useToast();

    const handleSave = async () => {
        setIsLoading(true);
        const { update } = await import('../../../services/api/lib/interest');

        const data = {
            interest: {
                //@ts-ignore
                third_party: third?.join(';;'),
            },
        };

        const { ok } = await update({ id: myInterest?.interests?.id, data });

        if (ok) {
            setIsLoading(false);
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

                        <VStack w="full">
                            {interest?.stage.map((item, index) => (
                                <CheckCard
                                    w="full"
                                    width="full"
                                    key={`${index}-stageFilter`}
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
                                    <Text>{StageCapital(item)}</Text>
                                </CheckCard>
                            ))}
                        </VStack>

                        <Button w="full" h="40px" variant="solid">
                            Guardar cambios
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default StageModal;
