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
import Stage from 'components/projectDetail/formatText/stage';
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

const CapitalStageModal: React.FC<Props> = ({ isOpen, onClose, interest, myInterest, reload }) => {
    const [stageCapital, setStageCapital] = useState([]);

    const { getCheckboxProps, setValue } = useCheckboxGroup({
        defaultValue: stageCapital,
        onChange: (value) => setStageCapital(value),
    });

    const toast = useToast();
    const initialRef = useRef(null);

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
            reload();
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
                        <Heading fontFamily="barlow" fontSize="24px" lineHeight="130%" textTransform="uppercase">
                            ETAPA DE LEVANTAMIENTO
                        </Heading>
                        <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px" fontWeight="normal">
                            Selecciona una o más alternativas según tus intereses de inversión de impacto.
                        </Text>
                    </VStack>
                </ModalHeader>
                <ModalBody m={0} pt={0} h="330px" className="custom-scroll-light" position={'relative'}>
                    {interest?.capital_stage.map((item, index) => (
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
                                <Text>{Stage(item)}</Text>
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

export default CapitalStageModal;
