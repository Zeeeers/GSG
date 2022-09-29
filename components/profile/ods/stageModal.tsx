//@ts-nocheck
import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useCheckboxGroup,
    useToast,
    VStack,
    WrapItem,
} from '@chakra-ui/react';
import CheckCard from 'common/checkCard';
import StageCapital from 'components/projectDetail/formatText/stageCapital';
import React, { useEffect, useRef, useState } from 'react';
import { Interest } from 'services/api/types/Interest';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    interest?: Interest;
    myInterest: Interest;
    reload?: () => void;
}

const StageModal: React.FC<Props> = ({ isOpen, onClose, interest, myInterest, reload }) => {
    const [stage, setStage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { getCheckboxProps, setValue } = useCheckboxGroup({
        defaultValue: stage,
        onChange: (value) => setStage(value),
    });

    const toast = useToast();
    const initialRef = useRef(null);

    const handleSave = async () => {
        setIsLoading(true);
        const { update } = await import('../../../services/api/lib/interest');

        const data = {
            interest: {
                //@ts-ignore
                stage: stage.join(';;'),
            },
        };

        const { ok } = await update({ id: myInterest?.id, data });

        if (ok) {
            setIsLoading(false);
            reload();
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
            setValue(myInterest && myInterest?.stage.split(';;'));
        }
    }, [myInterest]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size="xl"
            blockScrollOnMount={true}
            scrollBehavior="inside"
            initialFocusRef={initialRef}
        >
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="60px">
                <ModalCloseButton />
                <ModalHeader p={0} mb="20px" ref={initialRef} tabIndex={2}>
                    <VStack alignItems="flex-start" spacing="10px">
                        <Heading fontFamily="barlow" fontSize="24px" lineHeight="20.8px" textTransform="uppercase">
                            ETAPA DE PROYECTO
                        </Heading>
                        <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px" fontWeight="normal">
                            Selecciona las etapas del proyecto que consideres necesarias para recibir correos con
                            recomendaciones de proyectos asociados a esta categoría.
                        </Text>
                    </VStack>
                </ModalHeader>

                <ModalBody m={0} pt={0} h="330px" className="custom-scroll-light" position={'relative'}>
                    {interest?.stage.map((item, index) => (
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
                                mt="8px"
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
                                <Text>{StageCapital(item)}</Text>
                            </CheckCard>
                        </VStack>
                    ))}
                </ModalBody>

                <ModalFooter>
                    <Button w="full" h="40px" variant="solid" onClick={handleSave}>
                        Guardar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default StageModal;
