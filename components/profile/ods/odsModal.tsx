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
import React, { useState } from 'react';
import { useUser } from 'services/api/lib/user';
import { Interest } from 'services/api/types/Interest';

// Types
interface Props {
    isOpen: boolean;
    onClose(): void;
    interest?: Interest;
}

const OdsModal: React.FC<Props> = ({ isOpen, onClose, interest }) => {
    //@ts-ignore
    const [ods, setOds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { getCheckboxProps } = useCheckboxGroup({
        defaultValue: ods,
        //@ts-ignore
        onChange: (value) => setOds(value),
    });
    const { data: user } = useUser();

    const toast = useToast();

    const handleSave = async () => {
        setIsLoading(true);
        const { update } = await import('../../../services/api/lib/interest');

        const { ok } = await update(user?.id, ods?.join(';;'));

        if (ok) {
            setIsLoading(false);
            toast({
                //@ts-ignore
                title: 'OSD guardado con éxito.',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'top-right',
            });
        } else {
            setIsLoading(false);
            toast({
                //@ts-ignore
                title: 'Ha ocurrido un error al crear el ODS.',
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
                                Respaldo de una ODS
                            </Heading>
                            <Text fontFamily="inter" fontSize="16px" lineHeight="20.8px">
                                A continuación se presentan las alternativas que podrás elegir para recibir correos con
                                recomendaciones de empresas, productos o servicios asociados a esta categoría
                            </Text>
                        </VStack>

                        <VStack w="full" overflowY="auto" h="330px">
                            {interest?.qualities.map((item, index) => (
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
                                    disabled={ods?.length >= 3}
                                    _hover={{ bg: 'gray.600' }}
                                    _checked={{ bg: 'teal.500', textColor: 'white', _hover: { bg: 'teal.600' } }}
                                    {...getCheckboxProps({ value: item.id })}
                                >
                                    <Text>{item.icon.name}</Text>
                                </CheckCard>
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
                            Guardar cambios
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default OdsModal;
