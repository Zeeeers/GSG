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

const OdsModal: React.FC<Props> = ({ isOpen, onClose, interest, myInterest, reload }) => {
    //@ts-ignore
    const [ods, setOds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { getCheckboxProps, setValue } = useCheckboxGroup({
        defaultValue: ods,
        //@ts-ignore
        onChange: (value) => setOds(value),
    });

    const { data: user } = useUser();

    const toast = useToast();

    const handleSave = async () => {
        setIsLoading(true);
        const { update } = await import('../../../services/api/lib/interest');

        const data = {
            qualities: ods?.join(';;'),
        };

        const { ok } = await update({ id: myInterest?.id, data });

        if (ok) {
            setIsLoading(false);
            reload();
            toast({
                //@ts-ignore
                title: 'ODS guardado con éxito.',
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
                title: 'Ha ocurrido un error al guardar los ODS.',
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    useEffect(() => {
        if (myInterest?.qualities) {
            setValue(myInterest && Object.values(myInterest.qualities).map((i) => i.id.toString()));
        }
    }, [myInterest]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent rounded="2xl" px="30px" py="60px" overflow="hidden">
                <ModalCloseButton />
                <ModalBody mb={6} pt={0}>
                    <VStack alignItems="flex-start" spacing="30px" w="full">
                        <VStack alignItems="flex-start" spacing="10px">
                            <Heading fontFamily="barlow" fontSize="24px" lineHeight="24px" textTransform="uppercase">
                                OBJETIVOS DE DESARROLLO SOSTENIBLE (ODS)
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                Selecciona los ODS que consideres necesarios para recibir correos con recomendaciones de
                                proyectos asociados a esta categoría
                            </Text>
                        </VStack>

                        <VStack w="full" overflowY="auto" h="330px" className="custom-scroll-light">
                            {interest?.qualities.map((item, index) => (
                                <VStack key={index} w="full" borderBottom="1px" borderBottomColor="gray.500" pb="10px">
                                    <CheckCard
                                        w="full"
                                        width="full"
                                        key={`${index}-explorerFilter`}
                                        as={WrapItem}
                                        v
                                        value={item.id}
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
                                        _checked={{ bg: 'gray.600', textColor: 'white', _hover: { bg: 'gray.500' } }}
                                        {...getCheckboxProps({ value: item.id })}
                                    >
                                        <Text>{`${item.id})  ${item.icon.name}`}</Text>
                                    </CheckCard>
                                </VStack>
                            ))}
                        </VStack>

                        <Button
                            isLoading={isLoading}
                            loadingText="Guardando ODS"
                            onClick={handleSave}
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

export default OdsModal;
